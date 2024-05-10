import {useMemo} from 'react';

import {HeroCard} from './';
import {getHeroesByPublisher} from '../helpers';

export const HeroList = ({publisher}) => {
    // In this case useMemo is not required since the component is not going to be re-rendered, but it is used for the sake
    // of learning
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="row rows-cols-1 row-cols-md-3 g-3">
            {
                heroes.map(hero => (
                    <HeroCard
                        key={hero.id}
                        {...hero}
                    />
                ))
            }
        </div>
    );
};
