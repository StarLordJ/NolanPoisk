import { connect } from 'react-redux';
import { sendMovieReview } from "../../../Store/Actions/reviews";
import { Store } from 'Store/Store';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { ReviewForm } from "./ReviewForm";


const mapStateToProps = (state: Store) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, null, Action>) => {
    return {
        sendMovieReview: (name: string, text: string, cb: (status: boolean) => void) => dispatch(sendMovieReview(name, text, cb)),
    }
}

export const ReviewFormContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
