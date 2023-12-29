import {defineStore} from 'pinia'
import {OfferModalType} from "~/app/types/offers";


export type ModalType = {
    open: boolean
    title: string
    text?: string
    type: string
}
export type ModalTextType = {
    open: boolean
    title: string
    text?: string
}

export const useModals = defineStore('modals', {
    state: () => ({
        modal: <ModalType>{
            open: false,
            title: '',
            type: ''
        },
        modalText: <ModalTextType>{
            open: false,
            title: '',
            text: '',
        },
        modalOffer: <OfferModalType | null>null
    }),
    actions: {
        async openModal(payload: ModalType) {
            this.modal = payload
        },
        async openModalText(payload: ModalTextType) {

            this.modalText = payload
        },
        async closeModal() {
            this.modal.open = false
            setTimeout(() => {
                this.modal.title = ''
                this.modal.type = ''
                this.modal.text = ''
                this.modalOffer = null
            }, 100)
        },
        async closeModalText() {
            this.modalText.open = false
            setTimeout(() => {
                this.modalText.title = ''
                this.modalText.text = ''
            }, 100)
        },

        async setModalOffer(payload: OfferModalType) {
            this.modalOffer = payload
        },
    }
})