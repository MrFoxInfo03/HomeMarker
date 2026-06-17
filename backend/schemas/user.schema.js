const { z } = require("zod");

const userRegistrationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().max(255),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  phone_number: z.string().regex(/^\+380\d{9}$/)
});

module.exports = { userRegistrationSchema }