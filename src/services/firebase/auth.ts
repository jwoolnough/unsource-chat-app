import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

import { app } from "./app";

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { auth };
