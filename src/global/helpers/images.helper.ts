export const renameImage = (req, file, callback) => {
  const ext = file.originalname.split('.')[1];
  const fileName = file.originalname;
  const randonName = Array(5)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  console.log(file);
  callback(null, `${Date.now()}-${randonName}.${ext}`);
};
