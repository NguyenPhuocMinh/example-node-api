'use strict';

const errorCodes = [
  {
    nameCode: 'InvalidVerifiedPassword',
    messageCode: 'Xác nhận mật khẩu không hợp lệ',
    returnCode: 1,
    statusCode: 400,
  },
  {
    nameCode: 'InvalidCurrentPassword',
    messageCode: 'Mật khẩu hiển tại không đúng',
    returnCode: 2,
    statusCode: 400,
  },
  {
    nameCode: 'DuplicateEmailRegister',
    messageCode: 'Email đã được đăng ký',
    returnCode: 3,
    statusCode: 400,
  },
  {
    nameCode: 'EmailNotFound',
    messageCode: 'Không tìm thấy email',
    returnCode: 4,
    statusCode: 404,
  },
  {
    nameCode: 'InValidPassword',
    messageCode: 'Mật khẩu không đúng',
    returnCode: 5,
    statusCode: 400,
  },
  {
    nameCode: 'InvalidVerifiedNewPassword',
    messageCode: 'Mật khẩu mới đã xác minh không hợp lệ',
    returnCode: 10,
    statusCode: 400,
  },
]

module.exports = errorCodes;