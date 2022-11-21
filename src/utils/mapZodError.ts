import { z } from "@deps";
import { FormError } from "@types"

const mapZodError = (error: z.ZodError): Array<FormError> => error.issues.map((error) => ({ field: `${error.path[0]}`, message: error.message }))
export default mapZodError