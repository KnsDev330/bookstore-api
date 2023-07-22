import PasswordUtils from "../../../utils/PasswordUtils.js";
import IUser from "./user.interface.js";
import { User } from "./user.model.js";
import { BadRequest, InternalServerError } from "../../../errors/ApiErrors.js";
import { randInt } from "../../../utils/utils.js";

const UserService = {
   getAll: async (limit: number, skip: number) => {
      const total = await User.count({});
      const users = await User.find({}, { __v: false }).limit(limit).skip(skip).sort({ createdAt: "desc" });
      return { users, total };
   },


   getOneById: async (id: string) => {
      const user = await User.findById(id, { __v: false });
      if (!user) throw new BadRequest(`No user found with given ID`);
      return user;
   },


   getOneByQuery: async (query: any, projection?: any, selectPassword: boolean = false) => {
      let q = User.findOne(query, projection || {});
      if (selectPassword) q = q.select('+password');
      const user = await q;
      if (!user) throw new BadRequest(`User not found`);
      return user;
   },


   deleteOneById: async (id: string) => {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) throw new InternalServerError(`Could not delete user, does the user exists?`);
      deletedUser.__v = undefined;
      deletedUser.password = undefined;
      return deletedUser;
   },


   updateOneById: async (id: string, payload: Partial<IUser>) => {
      const newUserData: Partial<IUser> = payload;
      if (newUserData.password) newUserData.password = await PasswordUtils.hashPassword(newUserData.password);
      const user = await User.findByIdAndUpdate(id, newUserData, { new: true });
      if (!user) throw new InternalServerError(`Could not update user`);
      user.__v = undefined;
      user.password = undefined;
      return user;
   },


   create: async (payload: IUser) => {
      if (payload.password)
         payload.password = await PasswordUtils.hashPassword(payload.password);

      payload.dp = `/dps/${randInt(1, 10)}.svg`;
      payload.counters = {
         books: 0,
         reads: 0,
         reviews: 0
      }
      const user = await User.create(payload);

      if (!user)
         throw new InternalServerError(`Could not create user`);
      user.password = undefined;
      user.__v = undefined;
      return user;
   },
};

export default UserService;
