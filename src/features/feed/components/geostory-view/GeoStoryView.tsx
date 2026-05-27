import './styles.scss';

import LogoPlayWhiteIcon from '../../../../assets/images/logo_play_white.png';
import PlayIcon from '../../../../assets/images/play.png';
import { HeartIcon, SpeakerSimpleHighIcon, SpeakerSimpleSlashIcon } from '@phosphor-icons/react';
import { ShareFatIcon } from '@phosphor-icons/react';
import { GeoStoryPlayer } from '../geostory-player/GeoStoryPlayer';
import type { GeoStoryFeed } from '../../../geostories/modules/feed/domain/GeoStoryFeed';
import { FeedType } from '../../../geostories/modules/feed/domain/GeoStoryFeed';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLangFromUrl, useTranslations } from '../../../../i18n';
import type { GeoPoint } from '../../../shared/geopoint/domain/GeoPoint';
import { PressableIcon } from '../../../../ui-library/components/pressable-icon';
import { publish, subscribe, unsubscribe } from '../../../../services/domain-events-bus';
import { AppEvents } from '../../../shared/domain/events';
import { formatDate } from '../../../../utils/dateConfig';

const lang = getLangFromUrl(new URL(window.location.href));

export interface GeoStoryViewProps {
	feedType?: FeedType;
	geoStory: GeoStoryFeed;
	geoPoint?: GeoPoint;
	playing: boolean;
	noDistance?: boolean;
	index: number;
	onVisibilityChange: (index: number, isVisible: boolean) => void;
}

export function GeoStoryView({ feedType, geoStory, geoPoint, playing, noDistance = false, index, onVisibilityChange }: GeoStoryViewProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const t = useTranslations(lang);

	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	//const [firstPlay, setFirstPlay] = useState(true);

	const getFormattedDistance = useCallback((distance: number | undefined) => {
		if (!distance) return undefined;
		if (distance >= 1000) {
			return `a ${Math.round(distance / 1000).toFixed(1)}km`;
		}
		
		if (Math.round(distance) === 0) {
			return 'muy cerca de ti';
		}

		return `a ${Math.round(distance)}m`;
	}, []);

	const calculateDistance = useMemo(() => {
		if (!geoPoint) return undefined;
		// const distance = getDistanceFromLatLonInKm(geoStory.address.geoPoint.latitude, geoStory.address.geoPoint.longitude, geoPoint.latitude, geoPoint.longitude);
		const distance = geoStory.address.distance;
		return getFormattedDistance(distance);
	}, [geoStory, geoPoint]);

	const togglePlay = useCallback(() => {
		setIsPlaying(!isPlaying);
	}, [isPlaying]);

	const toggleSound = useCallback(() => {
		setIsMuted(!isMuted);
		publish(isMuted ? AppEvents.MUTED_VIDEO : AppEvents.UNMUTED_VIDEO);
	}, [isMuted]);

	const shareGeoStory = useCallback(() => {
		if (feedType === undefined) return;

		let feed;
		
		switch (feedType) {
			case FeedType.GEOSTORIES:
				feed = 'g';
				break;
			case FeedType.EVENTS:
				feed = 'e';
				break;
			case FeedType.LOCAL:
				feed = 'ol';
				break;
			case FeedType.TOURISM:
				feed = 't';
				break;
			default:
				feed = 'g';
				break;
		}

		navigator.share({
			title: geoStory.title || '',
			url: `${window.location.origin}/${feed}/${geoStory.id}`,
		});
	}, [geoStory]);

	const whereGeoStory = useCallback(() => {
		const url = `https://maps.google.com/?q=${encodeURIComponent(geoStory.address.address)}`;
		window.open(url, '_blank');
	}, [geoStory]);

	// IntersectionObserver for iOS compatibility - auto play/pause videos based on visibility
	useEffect(() => {
		if (!containerRef.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isIntersecting = entry.isIntersecting;
				setIsVisible(isIntersecting);
				onVisibilityChange(index, isIntersecting);
				
				// Auto play/pause based on visibility
				if (isIntersecting) {
					setIsPlaying(true);
				} else {
					setIsPlaying(false);
				}
			},
			{
				threshold: 0.6, // Video is considered visible when 60% is in view
				rootMargin: '-10% 0px -10% 0px' // Add some margin to avoid edge cases
			}
		);

		observer.observe(containerRef.current);

		return () => {
			observer.disconnect();
		};
	}, [index, onVisibilityChange]);

	useEffect(() => {
		if (isPlaying) {
			videoRef.current?.play();
		} else {
			videoRef.current?.pause();	
		}
	}, [isPlaying]);

	useEffect(() => {
		if (!videoRef.current) return;
		videoRef.current.muted = isMuted;
	}, [isMuted]);

	useEffect(() => {
		setIsPlaying(playing);
	}, [playing]);

	useEffect(() => {
		function onUnmutedVideo() {
			if (!videoRef.current) return;
			videoRef.current.muted = false;
		}

		function onMuttedVideo() {
			if (!videoRef.current) return;
			videoRef.current.muted = true;
		}

		subscribe(AppEvents.UNMUTED_VIDEO, onUnmutedVideo);

		subscribe(AppEvents.MUTED_VIDEO, onMuttedVideo);

		return () => {
			unsubscribe(AppEvents.UNMUTED_VIDEO, onUnmutedVideo);
			unsubscribe(AppEvents.MUTED_VIDEO, onMuttedVideo);
		};
	}, []);

	return (
		<div ref={containerRef} className="video-view__container">
			<GeoStoryPlayer ref={videoRef} geoStory={geoStory} />
			<div className="video-view__overlay">
				<div className="video-view__info">
					{geoPoint && !noDistance && <div><span className="video-view__distance">{calculateDistance}</span></div>}
					<div className="video-view__title">{geoStory.title}</div>
					{geoStory.startDate && <div className="video-view__title">finaliza {formatDate.long(geoStory.startDate.toISOString())}</div>}
					<div className="video-view__username">{geoStory.influencer?.id ? `@${geoStory.influencer?.name}` : geoStory.business?.name}</div>
					{geoStory.description && <div className="video-view__description">{geoStory.description}</div>}
				</div>
				<div className="video-view__actions">
					<img className="video-view__avatar" src={geoStory.avatar?.toString() || ''} alt={`${geoStory.influencer?.name || geoStory.business?.name || ''} avatar`} onClick={() => publish(AppEvents.OPEN_DOWNLOAD_APP_MODAL)}/>
					<div className="video-view__action" onClick={whereGeoStory}>
						<img src={LogoPlayWhiteIcon.src} width="48" />
						<span>{t('common.where')}</span>
					</div>
					<div className="video-view__action" onClick={() => publish(AppEvents.OPEN_DOWNLOAD_APP_MODAL)}>
						<HeartIcon color="#fff" size={32} />
						<span>{geoStory.likes}</span>
					</div>
					<div className="video-view__action" onClick={shareGeoStory}>
						<ShareFatIcon color="#fff" size={32} />
						<span>{t('common.share')}</span>
					</div>
				</div>
			</div>
			<div className="video-view__play" onClick={togglePlay}>
				{!isPlaying && <img src={PlayIcon.src} width="240" />}
			</div>
			<div className="video-view__sound">
				<PressableIcon 
					backgroundColor="rgba(84, 84, 84, 0.5)" 
					icon={isMuted ? <SpeakerSimpleSlashIcon size={24} color="#fff" weight='fill'/> : <SpeakerSimpleHighIcon size={24} color="#fff" weight='fill'/>}
					onClick={toggleSound}
				/>
			</div>
		</div>
	)
};