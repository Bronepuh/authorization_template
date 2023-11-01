import { apiInstance } from "../../../shared/api/base";
import { UserDTO } from "../utils/types";

export const fetchMeApi = async (accessToken: string): Promise<UserDTO> => {
  const {data} = await apiInstance.get(`http://localhost/api/users/me?accessToken=${accessToken}`);
  const user = new UserDTO(data);
  return user;
};

