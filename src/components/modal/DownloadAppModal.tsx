import { Modal } from "../../ui-library/components/modal";
import { useEffect, useState } from "react";
import { ThemeContextProvider } from "../../ui-library/themes";
import { subscribe, unsubscribe } from "../../services/domain-events-bus";
import { AppEvents } from "../../features/shared/domain/events";
import { DownloadAppModalContent, DownloadAppModalLogoContainer, DownloadAppModalSubtitle, DownloadAppModalTitle, DownloadButton } from "./styles";
import { Button } from "../../ui-library/components/button";

export function DownloadAppModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function onOpenDownloadAppModal() {
            setIsOpen(true);
        }

        function onCloseDownloadAppModal() {
            setIsOpen(false);
        }

        subscribe(AppEvents.OPEN_DOWNLOAD_APP_MODAL, onOpenDownloadAppModal);
        subscribe(AppEvents.CLOSE_DOWNLOAD_APP_MODAL, onCloseDownloadAppModal);

        return () => {
            unsubscribe(AppEvents.OPEN_DOWNLOAD_APP_MODAL, onOpenDownloadAppModal);
            unsubscribe(AppEvents.CLOSE_DOWNLOAD_APP_MODAL, onCloseDownloadAppModal);
        };
    }, []);

    if (!isOpen) {
        return <></>;
    }

    return (
        <ThemeContextProvider>
            <Modal width={310} onClose={() => setIsOpen(false)}>
                <DownloadAppModalContent>
                    <DownloadAppModalLogoContainer>
                        <img src="/images/goveo.jpg" alt="Goveo" width={56} height={56} />
                    </DownloadAppModalLogoContainer>
                    <DownloadAppModalTitle>Disfruta de una experiencia completa en la aplicación</DownloadAppModalTitle>
                    <DownloadAppModalSubtitle>Disfruta de más vídeos y funciones geniales en la aplicación</DownloadAppModalSubtitle>
                    <Button variant="primary" size="small" label="Abrir Goveo" fullWidth onClick={() => window.open('https://links.goveo.app/1GHor7ffjWb')}/>
                    <Button variant="text" size="small" label="Ahora no" fullWidth onClick={() => setIsOpen(false)}/>
                    <DownloadButton src="https://res.cloudinary.com/goveo/image/upload/v1614428709/ios_download_qsotdb.svg" alt="Goveo IOS" onClick={() => window.open('https://apps.apple.com/es/app/goveo/id1480569862')} />
                    <DownloadButton src="https://res.cloudinary.com/goveo/image/upload/v1614428709/android_download_ctcxvi.png" alt="Goveo Android" onClick={() => window.open('https://play.google.com/store/apps/details?id=app.goveo.android&hl=es_419&pli=1')} />
                </DownloadAppModalContent>
            </Modal>
        </ThemeContextProvider>
    );
}