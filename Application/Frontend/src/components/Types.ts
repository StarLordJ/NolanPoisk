export interface User {
    name: string;
    email: string;
    privilege: boolean;
}

export interface Review {
    username: string;
    email: string;
    date: Date;
    text: string;
    isApproved: boolean;
    id: number;
}

export interface RatingInfo {
    averageRating: {
        count: number;
        rating: number;
    };
    userMark: number;
}

export interface MovieShortInfo {
    name: string;
    shortDescription: string;
    genre: string[];
    year: number;
    posterUrl: string;
}

export interface MoviePageInfo {
    name: string;
    cast: string[];
    tagline: string;
    genre: string[];
    description: string;
    trailerUrl: string;
    year: number;
    posterUrl: string;
}

export type MovieInfo = MovieShortInfo | MovieShortInfo & MoviePageInfo;
