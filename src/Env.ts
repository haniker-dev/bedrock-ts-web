import * as JD from "decoders"

const env = JD.object({
  APP_ENV: JD.string,
  API_HOST: JD.string,
}).verify({
  APP_ENV: import.meta.env.VITE_APP_ENV,
  API_HOST: import.meta.env.VITE_API_HOST,
})

export default env
