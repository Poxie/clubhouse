import { User } from "firebase/auth";

export default {
    user: null,
    loading: true
} as {
    user: User | null;
    loading: boolean;
}