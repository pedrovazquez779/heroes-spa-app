import {useMemo} from 'react';

import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {getHeroesById} from '../helpers';

export const HeroPage = () => {
    // id is coming from the url segment, because we put that name on the route
    // this is not a query param
    const {id} = useParams();
    const navigate = useNavigate();

    // In this case useMemo is not required since the component is not going to be re-rendered, but it is used for the sake
    // of learning
    const hero = useMemo(() => getHeroesById(id), [id]);

    const heroImgUrl = `/assets/heroes/${id}.jpg`;

    const onNavigateBack = () => {
        navigate(-1); // go back one page in history
    };

    if (!hero) {
        return (
            <Navigate to="/marvel"/>
        );
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={heroImgUrl} alt={hero.superhero} className="img-thumbnail animate__animated animate__fadeInLeft"/>
            </div>
            <div className="col-8">
                <h3>{hero.superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b> {hero.publisher}</li>
                    <li className="list-group-item"><b>First Appearance:</b> {hero.first_appearance}</li>
                </ul>

                <h5 className="mt-3"> Characters </h5>
                <p>{hero.characters}</p>

                <button
                    className="btn btn-outline-primary"
                    onClick={onNavigateBack}
                >
                    Back
                </button>
            </div>
        </div>
    );
};
