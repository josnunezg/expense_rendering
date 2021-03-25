import { AuthChecker } from 'type-graphql';

import { IContext } from '../interfaces';

const authChecker: AuthChecker<IContext> = ({ context: { user } }, _roles) => {
  return !!user;
}

export default authChecker;
