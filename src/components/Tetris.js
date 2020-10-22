import React, {useState} from 'react';
import {createStage} from "../gameHelpers";

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// Customs hooks
import {useStage} from '../hooks/useStage'
import {usePlayer} from '../hooks/usePlayer'

// Styled Components
import {StyledTetrisWrapper, StyledTetris} from './styles/StyledTetris';
import {randomTetromino} from "../tetrominos";

const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    // {
    //     pos: { x: 0, y: 0 },
    //     tetromino: randomTetromino().shape,
    //     collided: false,
    // }
    const [stage, setStage] = useStage(player);

    // new 20 length [[12 length 0, clear]]
    console.log(stage);

    const movePlayer = dir => {
        updatePlayerPos({x: dir, y: 0});
    }

    const startGame = () => {
        console.log("test")
        // Reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x: 0, y: 1, collided: false})
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({keyCode}) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }


    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                            <Display gameOver={gameOver} text="Game Over"/>
                        ) :
                        (<div>
                                <Display text="Score"/>
                                <Display text="Rows"/>
                                <Display text="Level"/>
                            </div>
                        )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
