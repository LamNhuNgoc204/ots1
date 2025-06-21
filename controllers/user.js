const User = require("../models/userModel");
const { hashPassword, checkPassword } = require("../utils/encryption");

//signup
exports.signup = async (req, res) => {
  try {
    const { fullName, birthDate, email, cccd, password } = req.body;

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ code: 400, status: false, message: "Email đã tồn tại" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      fullName: fullName.trim(),
      birthDate: birthDate,
      email: email.toLowerCase(),
      cccd: cccd,
      password: hashedPassword,
      createAt: new Date(),
      updateAt: new Date(),
    });

    await newUser.save();

    return res.status(201).json({
      status: true,
      data: {
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        birthDate: newUser.birthDate,
        cccd: newUser.cccd,
        createAt: newUser.createAt,
      },
      message: "Đăng ký thành công!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Lỗi server" });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Vui lòng cung cấp cả email và mật khẩu.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        code: 400,
        status: false,
        message: "Người dùng không tồn tại!!!",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ code: 401, status: false, message: "Mật khẩu không hợp lệ." });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      status: true,
      message: "Đăng nhập thành công!",
      data: userResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: false, message: "Lỗi server" });
  }
};
