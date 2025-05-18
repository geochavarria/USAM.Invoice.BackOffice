import withRouter from "./withRouter";

/**
 * NonAuthLayout Util
 * @file src\Layouts\NonAuthLayout.js
 */
const NonAuthLayout = ({ children }) => {

    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);