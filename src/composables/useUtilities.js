
import { notify } from "notiwind";

export function useUtilities() {
    const moneyFormat = (amount , currencySymbol) => {
        return new Intl.NumberFormat().format(amount) + ' ' + currencySymbol.toUpperCase()

    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    const showNotification = (title, text, status) => {
        notify({
            group: "top",
            title: title,
            status:status,
            text: text
        }, 10000) // 4s
    }

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }



    return { showNotification, moneyFormat, validateEmail , getCurrentDate}
}