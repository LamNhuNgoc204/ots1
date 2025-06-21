// Middleware
const {
  validatePassword,
  validateEmail,
  validateCCCD,
} = require("../utils/StringProcessing");

exports.validateRegister = (req, res, next) => {
  const { fullName, birthDate, email, cccd, password } = req.body;

  // Check if all required fields are provided
  if (!fullName || !birthDate || !email || !cccd || !password) {
    return res.status(400).json({
      status: false,
      message: "Vui lòng cung cấp đầy đủ thông tin.",
    });
  }

  // Check if fullName is a valid string
  if (typeof fullName !== "string" || fullName.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Họ tên không hợp lệ.",
    });
  }

  // Check if birthDate is a valid date
  const birthDateObj = new Date(birthDate);
  if (isNaN(birthDateObj.getTime())) {
    return res.status(400).json({
      status: false,
      message: "Ngày tháng năm sinh không hợp lệ.",
    });
  }

  // Check if birthDate is not in the future
  if (birthDateObj > new Date()) {
    return res.status(400).json({
      status: false,
      message: "Ngày tháng năm sinh không được là ngày trong tương lai.",
    });
  }

  // Check if cccd is a valid string
  if (typeof cccd !== "string" || cccd.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "CCCD không hợp lệ.",
    });
  }

  // Check if email is a valid email format
  if (!validateEmail(email)) {
    return res.status(400).json({
      status: false,
      message: "Email không đúng định dạng.",
    });
  }

  // Check if password is a valid string
  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Mật khẩu không hợp lệ.",
    });
  }

  // Check if password meets complexity requirements
  if (!validatePassword(password)) {
    return res.status(400).json({
      status: false,
      message: "Mật khẩu phải trên 6 ký tự và có ký tự đặc biệt",
    });
  }

  // Check if cccd is a valid 12-digit number
  if (!validateCCCD(cccd)) {
    return res.status(400).json({
      status: false,
      message: "CCCD không hợp lệ. CCCD phải là 12 chữ số.",
    });
  }

  // If all validations pass, proceed to the next middleware
  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Email và mật khẩu là bắt buộc!",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: "Email không đúng định dạng.",
    });
  }

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "Mật khẩu không hợp lệ.",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      status: false,
      message: "Mật khẩu phải trên 6 ký tự và có ký tự đặc biệt",
    });
  }

  next();
};
