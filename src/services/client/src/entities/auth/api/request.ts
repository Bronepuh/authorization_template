import { apiInstance } from "../../../shared/api/base";
import { IRawUser } from "../../user/utils/types";

export interface IAuthUserParameters {
  email: string;
  password: string;
}

export const registrationApi = async (parameters: IAuthUserParameters): Promise<{message: string}> => {
  const {data} = await apiInstance.post('http://localhost/api/auth/registration', parameters);
  return data;
};

export const loginApi = async (parameters: IAuthUserParameters): Promise<IRawUser> => {
  const {data} = await apiInstance.post('http://localhost/api/auth/login', parameters);
  return data;
};

