import './styles.scss';
import { GeoStoryView } from './components/geostory-view/GeoStoryView';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FeedType, type GeoStoryFeed } from '../geostories/modules/feed/domain/GeoStoryFeed';
import { SupabaseGeoStoriesFeedRepository } from '../geostories/modules/feed/infrastructure/SupabaseGeoStoriesFeedRepository';
import { Loader } from '../../ui-library/components/loader/Loader';
import { CaretDownIcon, CaretUpIcon, FunnelIcon, ListIcon, MagnifyingGlassIcon, MapPinIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import { PressableIcon } from '../../ui-library/components/pressable-icon';
import { MobileLocationSearch } from '../location-search/components/MobileLocationSearch';
import { ThemeContextProvider } from '../../ui-library/themes';
import { Chip } from '../../ui-library/components/chip';
import { MobileGeoStoriesFilter } from './components/geostories-filter/MobileGeoStoriesFilter';
import type { Category } from '../categories/modules/List/domain/Category';
import { COOKIES_KEYS } from '../../services/cookies/constants';
import { set as setCookie } from '../../services/cookies';
import { useIsMobile } from '../../ui-library/hooks';
import { AppEvents } from '../shared/domain/events';
import { publish } from '../../services/domain-events-bus';

const repository = new SupabaseGeoStoriesFeedRepository();

export interface FeedProps {
	preFetchedGeoStory?: GeoStoryFeed;
	predefinedLocation: { place_id: string; lat: number; lng: number; address: string };
	hasLocationCookie?: boolean;
	feedType?: FeedType;
	category?: string;
	categories: Category[];
	maxDist?: number;
}

export function Feed({ preFetchedGeoStory, predefinedLocation, feedType, category, categories, maxDist }: FeedProps) {
	const isMobile = useIsMobile();
	const [geoStories, setGeoStories] = useState<GeoStoryFeed[]>([...(preFetchedGeoStory ? [preFetchedGeoStory] : [])]);
	const [currentIndex, setCurrentIndex] = useState(1);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [openedSearchModule, setOpenedSearchModule] = useState(false);
	const [openedFiltersModule, setOpenedFiltersModule] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState<{ place_id: string; lat: number; lng: number; address: string }>(predefinedLocation);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories.find((cat) => cat.id === category) || null);
	const [selectedNotCategory, setSelectedNotCategory] = useState<Category | null>(null);
	const [isFirstFetch, setIsFirstFetch] = useState(true);
	const feedListRef = useRef<HTMLDivElement>(null);

	const hasMoreGeoStories = useMemo(() => {
		return geoStories.length <= total;
	}, [geoStories, total]);

	// iOS compatible video management - using intersection observer instead of scroll snap events
	const [visibleVideoIndex, setVisibleVideoIndex] = useState<number>(0);

	const handleVideoVisibilityChange = useCallback((index: number, isVisible: boolean) => {
		if (isVisible) {
			setVisibleVideoIndex(index);
			setCurrentIndex(index + 1); // currentIndex is 1-based
		}
	}, []);

	const onChangedIndex = useCallback(() => {
		if (hasMoreGeoStories && currentIndex === geoStories.length - 4) {
			setPage(prev => prev + 1);
		}
	}, [hasMoreGeoStories, currentIndex, geoStories]);

	useEffect(() => {
		onChangedIndex();
	}, [currentIndex]);

	const fetchGeoStories = useCallback(async ({feedType, category, notCategory, page, lat, long, ignore, maxDist}: {feedType?: FeedType, category?: string, notCategory?: string, page: number, lat?: number, long?: number, ignore?: string, maxDist?: number}) => {
		const geoStories = await repository.retrieveGeoStories({
			page,
			feedType,
			category,
			notCategory,
			lat,
			long,
			ignore,
			maxDist,
		});
		setGeoStories(prev => [...prev, ...geoStories.items]);
		setTotal(geoStories.total);
	}, [repository]);

	const resetState = useCallback((geostory?: GeoStoryFeed) => {
		setIsLoading(true);
		setIsError(false);
		setPage(0);
		setTotal(0);

		if (!geostory) {
			setGeoStories([]);
		}
	}, []);

	// Remove iOS incompatible scroll snap event listeners - now using intersection observer in GeoStoryView components

	useEffect(() => {
		if (page === 0) return;
		
		// Calculate maxDist based on location
		const isIbiza = selectedLocation.address?.toLowerCase().includes('ibiza') || 
		                selectedLocation.address?.toLowerCase().includes('eivissa');
		const currentMaxDist = isIbiza ? 30000 : maxDist;
		
		fetchGeoStories(
			{...(selectedLocation ? {
				lat: selectedLocation.lat,
				long: selectedLocation.lng,
			} : undefined),
			feedType, 
			category: selectedCategory?.id,
			notCategory: selectedNotCategory?.id,
			page,
			maxDist: currentMaxDist
		});
	}, [page]);

	const refreshFeed = useCallback((preFetchedGeoStory?: GeoStoryFeed) => {
		resetState(preFetchedGeoStory);
		
		// Calculate maxDist based on location
		const locationToCheck = preFetchedGeoStory 
			? { address: preFetchedGeoStory.address.address }
			: selectedLocation;
		
		const isIbiza = locationToCheck.address?.toLowerCase().includes('ibiza') || 
		                locationToCheck.address?.toLowerCase().includes('eivissa');
		const currentMaxDist = isIbiza ? 30000 : maxDist;
		
		fetchGeoStories({
			...(preFetchedGeoStory ? {
				ignore: preFetchedGeoStory.id,
				lat: preFetchedGeoStory.address.geoPoint.latitude,
				long: preFetchedGeoStory.address.geoPoint.longitude,
			} : undefined),
			...(!preFetchedGeoStory && selectedLocation ? {
				lat: selectedLocation.lat,
				long: selectedLocation.lng,
			} : undefined),
			feedType, 
			category: selectedCategory?.id,
			notCategory: selectedNotCategory?.id,
			page,
			maxDist: currentMaxDist
		}).then(() => {
			setIsError(false);
		}).catch((error) => {
			console.error(error);
			setIsError(true);
		}).finally(() => {
			setIsLoading(false);
			setIsFirstFetch(false);
		});;
	}, [page, feedType, selectedCategory, selectedNotCategory, selectedLocation, maxDist, fetchGeoStories, resetState]);

	const scrollToPrevious = useCallback(() => {
		feedListRef.current?.scrollTo({
			top: screen.height * (currentIndex - 2),
			behavior: 'smooth',
		});
	}, [currentIndex]);

	const scrollToNext = useCallback(() => {
		feedListRef.current?.scrollTo({
			top: screen.height * (currentIndex),
			behavior: 'smooth',
		});
	}, [currentIndex]);

	const onSelectLocation = useCallback((location: { place_id: string; lat: number; lng: number; address: string }) => {
		setSelectedLocation(location);
		setOpenedSearchModule(false);

		setCookie(COOKIES_KEYS.LOCATION, encodeURIComponent(JSON.stringify(location)));
	}, []);

	const onSelectCategory = useCallback((category: Category) => {
		if (category.id === 'shop') {
			setSelectedCategory(null);
			setSelectedNotCategory({
				id: 'place',
				name: 'Turismo',
			});
			return;
		}
		if (category.id === 'all') {
			setSelectedCategory(null);
			setSelectedNotCategory(null);
			refreshFeed();
			return;
		} else {
			setSelectedCategory(category);
			setSelectedNotCategory(null);
		}
	}, []);

	useEffect(() => {
		refreshFeed(preFetchedGeoStory);
	}, [preFetchedGeoStory]);

	useEffect(() => {
		if (isFirstFetch) return;
		refreshFeed();
	}, [selectedLocation]);

	useEffect(() => {
		if (!selectedCategory && !selectedNotCategory) return;
		refreshFeed();
	}, [selectedCategory, selectedNotCategory]);

	// Auto-open download modal after 45 seconds
	useEffect(() => {
		const timer = setTimeout(() => {
			publish(AppEvents.OPEN_DOWNLOAD_APP_MODAL);
		}, 45000);

		return () => clearTimeout(timer);
	}, []);

	const geoPoint = useMemo(() => {
		return {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		}	
	}, [selectedLocation]);

	const locationLabel = useMemo(() => {
		if (!selectedLocation.address) return '¿Dónde estas?';
		const selectedLocationAddress = selectedLocation.address.length > 30 ? selectedLocation.address.slice(0, 30) + '...' : selectedLocation.address;
		return selectedLocationAddress;
	}, [selectedLocation]);


	const isPrefetchedGeoStory = useCallback((geoStory: GeoStoryFeed) => {
		return preFetchedGeoStory?.id === geoStory?.id;
	}, [preFetchedGeoStory, geoStories, currentIndex]);

	const isEmpty = useMemo(() => !isLoading && !isError && geoStories.length === 0, [isLoading, isError, geoStories]);

	const emptyText = useMemo(() => {
		let feedEmptyText = 'historias';

		if (feedType === FeedType.GEOSTORIES) {
			feedEmptyText = 'Geostories';
		}
		if (feedType === FeedType.EVENTS) {
			feedEmptyText = 'Eventos';
		}
		if (feedType === FeedType.TOURISM) {
			feedEmptyText = 'historias de Turismo';
		}
		if (feedType === FeedType.LOCAL) {
			feedEmptyText = 'historias de Oferta Local';
		}
		return `No hay ${feedEmptyText} disponibles en la zona. Prueba a buscar en otra área.`;
	}, [feedType]);

	return (
		<ThemeContextProvider>
			<div ref={feedListRef} className="feed__list">
				<>
					{!isLoading && <div className="feed__header">
						{isMobile && <PressableIcon backgroundColor="rgba(84, 84, 84, 0.5)" icon={<ListIcon color="white" size={24} />} onClick={() => publish(AppEvents.OPEN_MOBILE_SIDEBAR)}/>}
						<Chip 
							$variant="big" 
							label={locationLabel} 
							$color="#fff" 
							$bgColor="rgba(84, 84, 84, 0.5)" 
							icon={<MapPinIcon color="white" size={24} />}
							onClick={() => setOpenedSearchModule(true)}
						/>
						{/* <PressableIcon style={{ visibility: feedType === FeedType.PERSISTENT ? 'visible' : 'hidden' }} backgroundColor="rgba(84, 84, 84, 0.5)" icon={<FunnelIcon color="white" size={24} />} onClick={() => setOpenedFiltersModule(true)}/> */}
						<PressableIcon style={{ visibility: feedType === FeedType.LOCAL ? 'visible' : 'hidden' }} backgroundColor="rgba(84, 84, 84, 0.5)" icon={<MagnifyingGlassIcon color="white" size={24} />} onClick={() => publish(AppEvents.OPEN_DOWNLOAD_APP_MODAL)}/>
						{feedType === FeedType.LOCAL && (
							<div className="feed__cart">
								<PressableIcon 
									backgroundColor="rgba(84, 84, 84, 0.5)" 
									icon={<ShoppingCartIcon size={24} color="#fff" />}
									onClick={() => publish(AppEvents.OPEN_DOWNLOAD_APP_MODAL)}
								/>
							</div>
						)}
					</div>}
					{!isLoading && geoStories.length > 0 && geoStories.map((geoStory, index) => (
						<GeoStoryView 
							key={geoStory.id} 
							playing={(currentIndex - 1) === index} 
							feedType={feedType}
							geoStory={geoStory} 
							geoPoint={geoPoint} 
							noDistance={isPrefetchedGeoStory(geoStory)}
							index={index}
							onVisibilityChange={handleVideoVisibilityChange}
						/>
					))}
					{isLoading && (
						<div className="feed__loader">
							<Loader color="#FFF" backgroundColor="#000"/>
						</div>
					)}
					{isEmpty && (
						<div className="feed__empty">
							{emptyText}
						</div>
					)}
					{isError && <div className="feed__error">Error loading stories</div>}
					{openedSearchModule && (
						<MobileLocationSearch onSelect={onSelectLocation} onClose={() => setOpenedSearchModule(false)} />
					)}
					{openedFiltersModule && (
						<MobileGeoStoriesFilter items={categories.map((category) => ({
							value: category.id,
							label: category.name,
						}))} onSelected={(item) => onSelectCategory({
							id: item.value,
							name: item.label,
						})} onClose={() => setOpenedFiltersModule(false)} />
					)}
				</>
			</div>
			<div className="feed__controls not-mobile">
				<PressableIcon vPadding={12} hPadding={12} fullRadius disabled={currentIndex <= 1} icon={<CaretUpIcon color="white" size={24} />} onClick={scrollToPrevious} />
				<PressableIcon vPadding={12} hPadding={12} fullRadius disabled={currentIndex === geoStories.length - 1} icon={<CaretDownIcon color="white" size={24} />} onClick={scrollToNext} />
			</div>
		</ThemeContextProvider>
	)
}