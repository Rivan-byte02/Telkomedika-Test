export function validateBook(req, res, next) {
  const { title, author, year } = req.body ?? {};

  if (!title || String(title).trim() === "") {
    return res.status(400).json({ status: 'error', message: 'title is required'})
  }

  if (!author || String(author).trim() === "") {
    return res.status(400).json({ status: 'error', message: 'author is required'})
  }

  const yearNumber = Number(year);
  if (!Number.isInteger(yearNumber) || yearNumber < 1900 || yearNumber > 2100) {
    return res.status(400).json({ status: 'error', message: 'year must between 1900 - 2100'})
  }

  next();
}

export function validatePatchBook(req, res, next) {
  const { title, author, year } = req.body ?? {};

  if (title !== undefined && String(title).trim() === "") {
    return res.status(400).json({ status: 'error', message: 'title cannot be empty'})
  }

  if (author !== undefined && String(author).trim() === "") {
    return res.status(400).json({ status: 'error', message: 'author cannot be empty'})
  }

  if (author !== undefined) {
    const yearNumber = Number(year);
    if (!Number.isInteger(yearNumber) || yearNumber < 1900 || yearNumber > 2100) {
      return res.status(400).json({ status: 'error', message: 'year must between 1900 - 2100'})
    }
  }

  next();
}