import { Composition } from 'remotion';
import { Presentation } from './Presentation';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BosquesCalifornia"
        component={Presentation}
        durationInFrames={1800} // 60 segundos
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
