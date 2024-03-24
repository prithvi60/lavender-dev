import { Link } from 'react-router-dom';
import Button from "./Button";

const ButtonRouter = props => {
    const { to, ...rest} = props;

    return (
        <Link to={to}>
            <Button {...rest} />
        </Link>
    )
}

export default ButtonRouter;