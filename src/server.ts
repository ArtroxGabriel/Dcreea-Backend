process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import StateRoute from './routes/state.route';
import StatementRuleRoute from './routes/statementRule.route';
import ConditionalRuleRoute from './routes/conditionalRule.route';
import GameRoute from './routes/game.route';
import CardRoute from './routes/card.route';
import RoleRoute from './routes/role.route';
import DeckRoute from './routes/deck.route';
import TokenRoute from './routes/token.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new UsersRoute(),
    new AuthRoute(),
    new StateRoute(),
    new StatementRuleRoute(),
    new ConditionalRuleRoute(),
    new GameRoute(),
    new CardRoute(),
    new RoleRoute(),
    new DeckRoute(),
    new TokenRoute(),
]);

app.listen();
