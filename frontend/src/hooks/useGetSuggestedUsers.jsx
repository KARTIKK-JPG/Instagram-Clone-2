
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSuggestedUsers } from "@/redux/authSlice"

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get('instagram-clone-pi-neon.vercel.app/api/v1/user/suggested', { withCredentials: true })
                if (res.data.success) {
                    // console.log(res.data)
                    // console.log("Fetched suggested users:", res.data.user)
                    dispatch(setSuggestedUsers(res.data.user))
                }
            } catch (error) {
                console.log(error)
            }
        }


        fetchSuggestedUsers()
    }, [dispatch])
}

export default useGetSuggestedUsers
