import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const aboutText = `Звук Бизнес — аудиосервис для бизнеса. C 2016 года мы создаём музыкальную атмосферу в заведениях и помогаем брендам звучать красиво, увеличивать продажи и нравиться людям. Аудиосервис позволяет формировать музыкальные волны под любую целевую аудиторию, управлять удалённо музыкальным оформлением в сети заведений и добавлять любой аудиоконтент в свой музыкальный поток.`;

  const legalText =
    'Треки, содержащиеся в настоящем разделе, размещены исключительно в ознакомительных целях. В случае фиксации публичного исполнения указанных треков представителями РАО/ВОИС, иными третьими лицами, и последующего предъявления ими требований, претензий и/или исков относительно нарушения их прав при использовании музыкальных произведений и фонограмм, ООО «Звук Бизнес» (ОГРН 1 077 847 544 642) не будет нести ответственность за нарушения прав таких третьих лиц при использовании музыкальных произведений и фонограмм, в том числе не сможет оказать содействие в защите ваших прав и законных интересов. Для правомерного использования музыки необходимо заключить лицензионный договор с ООО «Звук Бизнес», в том числе путем акцепта оферты.';

  const openModal = (type) => {
    let newContent;
    if (type === 'pause') {
      newContent = aboutText;
    } else if (type === 'click') {
      newContent = legalText;
    }
    setContent(newContent);
    setTrigger(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTrigger(null);
  };

  const handlePlaybackChange = (isPlaying) => {
    if (isPlaying && !hasInteracted) {
      setHasInteracted(true);
    } else if (!isPlaying && hasInteracted) {
      openModal('pause');
    }
  };

  return { isOpen, content, trigger, openModal, closeModal, handlePlaybackChange };
};

export default useModal;
