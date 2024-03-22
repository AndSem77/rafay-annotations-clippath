import { useContext } from 'react';
import { BarrierContext } from '../context/BarrierContext';
import ConfigItem from './ConfigItem';

export default function ConfigList() {
  const { allConfigs } = useContext(BarrierContext);

  return (
    <>
      {allConfigs?.map((item) => (
        <ConfigItem item={item} key={item?.id} />
      ))}
    </>
  );
}
