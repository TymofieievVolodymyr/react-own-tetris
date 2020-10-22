import {useState, useEffect} from 'react';
import {createStage} from '../gameHelpers';

export const useStage = (player, resetPayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = prevStage => {
            //prevStage 20 length [[12 length 0, clear]]
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // console.log(newStage);
            // debugger;
            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player]);


    return [stage, setStage];
}