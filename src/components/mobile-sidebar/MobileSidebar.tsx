import './styles.scss';
import { useEffect, useState } from "react";
import { Drawer } from "../../ui-library/components/drawer";
import { AppEvents } from "../../features/shared/domain/events";
import { subscribe, unsubscribe } from "../../services/domain-events-bus";
import { ThemeContextProvider } from "../../ui-library/themes";
import { ListIcon } from '@phosphor-icons/react';
import { DownloadAppModalTitle, DownloadButton } from '../modal/styles';

const logo = '/images/goveo.png';

export function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function onOpenMobileSidebar() {
            setIsOpen(true);
        }

        function onCloseMobileSidebar() {
            setIsOpen(false);
        }

        subscribe(AppEvents.OPEN_MOBILE_SIDEBAR, onOpenMobileSidebar);
        subscribe(AppEvents.CLOSE_MOBILE_SIDEBAR, onCloseMobileSidebar);

        return () => {
            unsubscribe(AppEvents.OPEN_MOBILE_SIDEBAR, onOpenMobileSidebar);
            unsubscribe(AppEvents.CLOSE_MOBILE_SIDEBAR, onCloseMobileSidebar);
        };
    }, []);

    if (!isOpen) {
        return <></>;
    }

    return (
        <ThemeContextProvider>
            <Drawer width={60} noCloseButton onClose={() => setIsOpen(false)}>
                <nav className="mobile-left-sidebar__container">
                    <div className="mobile-left-sidebar__logo">
                        <ListIcon color="#292c32" size={32} />
                        <img src={logo} alt="Goveo" />
                    </div>
                    <div className="mobile-menu__container">
                        <ul className="mobile-menu__content">
                            <li className="mobile-menu__item">
                                <a href="https://es.goveo.app/turismo" target="_blank">
                                    <span className="mobile-menu__item-text">Turismo/Cultura</span>
                                </a>
                            </li>
                            <li className="mobile-menu__item">
                                <a href="https://es.goveo.app/tiendasuser" target="_blank">
                                    <span className="mobile-menu__item-text">Consume mejor cerca</span>
                                </a>
                            </li>
                            <li className="mobile-menu__item">
                                <a href="https://es.goveo.app/local-influencers" target="_blank">
                                    <span className="mobile-menu__item-text">Local influencers</span>
                                </a>
                            </li>
                            {/* <li className="mobile-menu__item">
                                <a href="https://es.goveo.app/reglas" target="_blank">
                                    <span className="mobile-menu__item-text">Reglas/Ayuda</span>
                                </a>
                            </li> */}
                            <li className="mobile-menu__item" style={{ backgroundColor: 'var(--primary-500)', color: 'white' }}>
                                <a href="https://es.goveo.app/tiendas" target="_blank">
                                    <span className="mobile-menu__item-text">¿Tienes un negocio?</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <DownloadAppModalTitle style={{marginBottom: "1rem"}}>Descarga la app:</DownloadAppModalTitle>
                        <DownloadButton src="https://res.cloudinary.com/goveo/image/upload/v1614428709/ios_download_qsotdb.svg" alt="Goveo IOS" onClick={() => window.open('https://apps.apple.com/es/app/goveo/id1480569862')} style={{width: "80%"}}/>
                        <DownloadButton src="https://res.cloudinary.com/goveo/image/upload/v1614428709/android_download_ctcxvi.png" alt="Goveo Android" onClick={() => window.open('https://play.google.com/store/apps/details?id=app.goveo.android&hl=es_419&pli=1')} style={{width: "80%"}} />
                    </div>
                    <div className="mobile-menu_footer">
                        © 2025 Goveo
                    </div>
                </nav>
            </Drawer>
        </ThemeContextProvider>
    );
}