import PasswordUtils from "../../../utils/PasswordUtils.js";
import IUser from "./user.interface.js";
import { User } from "./user.model.js";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";

const UserService = {
   /* get all users */
   getAllUsers: async (limit: number, skip: number) => {
      const total = await User.count({});
      const users = await User.find({}, { __v: false }).limit(limit).skip(skip).sort({ createdAt: "desc" });
      return { users, total };
   },

   /* get a single user */
   getSingleUserById: async (id: string) => {
      const user = await User.findById(id, { __v: false });
      if (!user) throw new BadRequest(`No user found with given ID`);
      return user;
   },

   /* get a single user by query */
   getSingleUserByQuery: async (query: any, projection?: any) => {
      const user = await User.findOne(query, projection || {});
      if (!user) throw new BadRequest(`User not found`);
      return user;
   },

   /* delete a single user */
   deleteSingleUserById: async (id: string) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new InternalServerError(`Could not delete user, does the user exists?`);
      deletedUser.__v = undefined;
      deletedUser.password = undefined;
      return deletedUser;
   },

   /* update a single user */
   updateSingleUserById: async (id: string, payload: Partial<IUser>) => {
      const newUserData: Partial<IUser> = payload;

      // if (name) {
      //    const nameKeys = Object.keys(name);
      //    if (name && nameKeys.length > 0) {
      //       nameKeys.forEach((key) => {
      //          const nameKey = `name.${key}`;
      //          (newUserData as any)[nameKey] = name[key as keyof typeof name];
      //       });
      //    }
      // }

      if (newUserData.password) newUserData.password = await PasswordUtils.hashPassword(newUserData.password);
      const user = await User.findByIdAndUpdate(id, newUserData, { new: true });
      if (!user) throw new InternalServerError(`Could not update user`);
      user.__v = undefined;
      user.password = undefined;
      return user;
   },

   /* create a single user */
   createSingleUser: async (payload: IUser) => {
      if (payload.password) payload.password = await PasswordUtils.hashPassword(payload.password);
      const user = await User.create(payload);
      if (!user) throw new InternalServerError(`Could not create user`);
      user.password = undefined;
      user.__v = undefined;
      return user;
   },
};

export default UserService;
