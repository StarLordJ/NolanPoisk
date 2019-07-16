import { connect } from 'react-redux';
import { sendMovieReview } from "../../../Store/Actions/reviews";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from 'Store/Actions/Actions';
import { ReviewForm, Props } from "./ReviewForm";

type MappedStateProps = Pick<Props, "user">;
type MappedDispatchProps = Pick<Props, "sendMovieReview">;

const mapStateToProps = (state: Store): MappedStateProps => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Actions>): MappedDispatchProps => {
    return {
        sendMovieReview: (name: string, text: string, cb: (status: boolean) => void) => dispatch(sendMovieReview(name, text, cb)),
    }
}

export const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
