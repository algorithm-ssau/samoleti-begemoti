import axios, { type CreateAxiosDefaults } from "axios";
import { Network } from "samolet-common";

const axiosConfig: CreateAxiosDefaults = { baseURL: "/api" };

export const network = new Network(config =>
    axios.create({ ...axiosConfig, ...config }),
);

export const getNetwork = () => {
    return network;
};
