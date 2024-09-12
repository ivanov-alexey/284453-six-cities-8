import path from 'node:path';
import { readFile } from 'node:fs/promises';

export const getPackageInfo = async () => {
	const packagePath = path.join(process.env.PWD, 'package.json');

	try {
		const content = await readFile(packagePath, 'utf8');

		return JSON.parse(content);
	} catch (e) {
		console.error(e.message);
	}
};

export const importFile = async (filePath) => {
	const fullPath = path.join(process.cwd(), filePath);

	try {
		return await readFile(fullPath, { encoding: 'utf8' });
	} catch (e) {
		console.error(e.message);
	}
};
