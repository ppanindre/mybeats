import axios from "axios";

const mailUrl =
    "https://us-central1-firebeats-43aaf.cloudfunctions.net/sendCustomMailFunction";

export const mailQueries = {
    sendRemoveDeviceMail: async (userId) => {
        try {
            await axios.get(`${mailUrl}/?docId=${userId}&type=${2}`);
        } catch (error) {
            console.error("Something went wrong while sending mail", error);
        }
    },

    sendFeedbackMail: async (userId) => {
        try {
            await axios.get(`${mailUrl}/?docId=${userId}&type=${4}`);
        } catch (error) {
            console.error("Something went wrong while sending mail", error);
        }
    },

    sendAddDeviceMail: async (userId) => {        
        try {
            await axios.get(`${mailUrl}/?docId=${userId}&type=${1}`);
        } catch (error) {
            console.error("Something went wrong while sending mail", error);
        }
    },

    sendDeleteMail: async (userId) => {
        try {
            await axios.get(`${mailUrl}/?docId=${userId}&type=${6}`);
        } catch (error) {
            console.error("Something went wrong while sending mail", error);
        }
    },
};
