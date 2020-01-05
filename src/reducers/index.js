import { combineReducers } from 'redux';
import WordReducer from './CurrentWordReducer';
import SavedReducer from './SavedWordsReducer';
import CommentsReducer from './CommentsReducer';
import ProjectsReducer from './ProjectsReducer';
import CurrentProjectReducer from './CurrentProjectReducer';

export default combineReducers({
    word: WordReducer,
    saved: SavedReducer,
    comments: CommentsReducer,
    projects: ProjectsReducer,
    currentProject : CurrentProjectReducer
});