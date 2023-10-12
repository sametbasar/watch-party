import { type Dispatch, type FC, type SetStateAction, Fragment, useContext } from 'react';

import { Button, Select, Text } from '@radix-ui/themes';

import { MYSELF } from '~/common/constants';
import { VideoContainer } from '~/components/room/video';
import { PeerVideo } from '~/components/room/video/_partials';
import useMediaStream from '~/hooks/use-media-stream';
import { UserContext } from '~/stores/user';

interface Props {
  setModalClose: Dispatch<SetStateAction<boolean>>;
}

export const SetupCamera: FC<Props> = ({ setModalClose }) => {
  const { stream, toggleVideo, isLoading } = useMediaStream();
  const { dispatch } = useContext(UserContext);

  const handleClose = () => {
    setModalClose(false);
    toggleVideo();
  };

  const handleSave = () => {
    setModalClose(false);
    dispatch({ type: 'OPEN_CAMERA_CHAT', payload: stream });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-4 w-full">
        {isLoading && !stream && <div className="h-[216px] w-full rounded-lg bg-black" />}
        {!isLoading && stream && (
          <VideoContainer stream={stream} id="" username="" visible muted>
            <PeerVideo name={MYSELF} stream={stream} isMe />
          </VideoContainer>
        )}
      </div>
      <div className="flex w-full flex-col gap-4">
        {stream && (
          <Fragment>
            <div>
              <Select.Root value={stream.getVideoTracks()[0].id}>
                <Text size="1">Select a Camera</Text>
                <Select.Trigger className="mt-1 w-full" placeholder="Select camera" />
                <Select.Content>
                  {stream.getVideoTracks().map((video) => {
                    return (
                      <Select.Item key={video.id} value={video.id}>
                        {video.label}
                      </Select.Item>
                    );
                  })}
                </Select.Content>
              </Select.Root>
            </div>
            <div>
              <Select.Root value={stream.getAudioTracks()[0].id}>
                <Text size="1">Select a Microphone</Text>
                <Select.Trigger className="mt-1 w-full" placeholder="Select camera" />
                <Select.Content>
                  {stream.getAudioTracks().map((video) => {
                    return (
                      <Select.Item key={video.id} value={video.id}>
                        {video.label}
                      </Select.Item>
                    );
                  })}
                </Select.Content>
              </Select.Root>
            </div>
          </Fragment>
        )}

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="3" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="3" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
