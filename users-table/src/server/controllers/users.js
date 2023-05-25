import formidable from 'formidable'
import { getAllUsers, getUserById, uploadUser } from '../services/users.js'
import { isValidData } from '../helpers/isValidData.js'

export const getAll = async (req, res) => {
  const data = await getAllUsers();

  res.send(data)
  res.end();
}

export const getById = async (req , res) => {
	const { userId } = req.params;

	const data = await getUserById(+userId);

	res.send(data);
	res.end();
};

export const uploadNewUser = async (req, res) => {
	const form = formidable({ multiples: true, maxFileSize: 5 * 1024 * 1024 });
	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error(err);
			res.status(500).send(err);
			return;
		}

		const { name, surname, email, phone, date } = fields;


		if (isValidData(name, surname,  email, phone) !== 'all data valid') {
			console.error(isValidData(name, surname, email, phone));
			res.status(422).send(isValidData(name, surname, email, phone));
			res.end();
			return;
		}

		uploadUser(name, surname, email, phone, date)
			.then((result) => {
				const newUser = result;
				res.send(`New user created with ID ${newUser.id}`);
				res.end();
			})
			.catch((err) => {
				console.error('Error creating new user:', err);
				res.status(500).send('Error creating new user');
				res.end();
			})
	});
}

// // module.exports = {
// 		getAll, getById, uploadNewUser
// };