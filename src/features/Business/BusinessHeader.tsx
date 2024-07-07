import { useState } from 'react'
import GetIcon from '../../assets/Icon/icon'
import Text from '../../components/Text'
import { getRoute } from '../../utils'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const BusinessHeader = ({pageName}) => {
    const navigate = useNavigate();
    const [state, setState] = useState(false)
    const getLoginRoute = () => {
        return getRoute("Login");
      };

      function handleLogOutBtn(){
        localStorage.clear();
        return navigate("/");
      }

    return (
        <nav className={`bg-white md:text-sm shadow-md w-full`}>
            <div className="gap-x-14 items-center px-2 md:flex md:px-4 py-2">
                <div className="flex flex-row items-center justify-between p-2">
                    <GetIcon
                            className="cursor-pointer  mr-8"
                            href={() => getLoginRoute()}
                            iconName="LavenderLogo"
                    />
                    <Text
                        onClick={() => {}}
                        align="left"
                        className="cursor-pointer nav-bar-title flex"
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                        name={pageName || "Lavender"}
                    />
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    
                
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <Button
                        onClick={()=>{handleLogOutBtn()}}
                        className="button-outline"
                        variant="outlined"
                        >Logout
                        </Button>
                        <GetIcon iconName='NotificationBell'/>
                        <GetIcon iconName='BusinessProfile'/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default BusinessHeader