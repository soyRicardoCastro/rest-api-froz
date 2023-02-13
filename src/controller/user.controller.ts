import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import {
  CreateUserInput,
  AddUniListParams,
  AddUniListInput,
  EditUserInput,
  EditUserParams,
} from '../schema/user.schema';
import { createUser, findUserById, findUsers } from '../service/user.service';
import UniversityModel from '../model/university.model';
import UserModel from '../model/user.model';
// import { findAllUni } from "../service/uni.service";
import CollegeFitModel from '../model/collegeFit.model';

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await findUsers();

    if (!users) return res.status(404).send('No users found');

    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal server error');
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await findUserById(id);

    if (!user) return res.status(404).send('No user found');

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function getCurrentUserHandler(_req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    await createUser(body);

    return res.send('User successfully created');
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send('Account already exists');
    }

    return res.status(500).send(e);
  }
}

export async function AddUniversityList(
  req: Request<AddUniListParams, {}, AddUniListInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const { universities } = req.body;

    const unisFound = await UniversityModel.find({
      _id: { $in: universities },
    });

    if (!unisFound) {
      return res.status(404).send('No unis found');
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).send('No user found');
    }

    const newUnis = unisFound.filter((uni) => {
      return !user.universities.some((u) => u && u._id.equals(uni._id));
    });

    user.universities.push(...newUnis);

    await user.save();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function addOneTaskCompleted(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).send('No user found');

    user.completedTasks += 1;

    await user.save();

    return res.status(201).send('User task completed successfully');
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function updateUser(
  req: Request<EditUserParams, {}, EditUserInput>,
  res: Response
) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;
    }

    const userUpdated = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(201).send(userUpdated);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(201).send('User deleted successfully');
  } catch (e) {
    return res.status(500).send(e);
  }
}

export const askQuestions = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) throw new Error('User not found');

    user.questions = req.body;

    await user.save();

    return res.status(201).send('OK');
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getAskQuestions = async (req: Request, res: Response) => {
  try {
    let arrayToSend: Array<{
      name: string;
      url: string;
      division: string;
      state: string;
    }> = [];

    const user = await UserModel.findById(req.params.id);
    if (!user) throw new Error('User not found');

    const division = await CollegeFitModel.find({
      competitionLevel: { $in: user.questions.ask12 },
    });
    if (!division) throw new Error('Division not found');

    const names = division.map((element) => element.name);
    const universities = await UniversityModel.find({
      state: { $in: user.questions.ask6 },
      division: { $in: names },
    });
    if (!universities) throw new Error('University not found');
    if (universities.length === 0)
      return res.status(404).json({ message: 'No match for your search' });

    universities.map((item) => {
      const newElement = {
        name: item.name,
        url: item.url,
        division: item.division,
        state: item.state,
      };
      arrayToSend.push(newElement);
    });

    return res.status(200).json({
      university: arrayToSend,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getUniversityMatch = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) throw new Error('User not found');

    const division = await CollegeFitModel.find({
      competitionLevel: { $in: user.questions.ask12 },
    });
    if (!division) throw new Error('Division not found');

    const names = division.map((element) => element.name);
    const universities = await UniversityModel.find({
      state: { $in: user.questions.ask6 },
      division: { $in: names },
    });
    if (!universities) throw new Error('University not found');
    if (universities.length === 0)
      return res.status(404).json({ message: 'No match for your search' });

    return res.status(200).json({
      userResponses: user.questions,
      universities: universities,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};

export const useSchedule = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404);

    user.schedule = req.body;
    await user.save();

    return res.status(202).send('Ok');
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
