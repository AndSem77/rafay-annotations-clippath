import { createContext, useState, useEffect, useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { initialConfigData } from '../data/initialConfigData';
import { dummyCdftData } from '../data/dummyCdftData';
import axios from 'axios';

export const BarrierContext = createContext();

export const BarrierProvider = ({ children }) => {
  const timestamp = Date.now();
  const configsURL = 'http://localhost:4000/configs';
  const wellsURL = 'http://localhost:4000/wells';

  const toast = useToast();
  const [allConfigs, setAllConfigs] = useState([]);
  const [configData, setConfigData] = useState(initialConfigData);
  const [allWells, setAllWells] = useState([]);
  const [wellData, setWellData] = useState(null);
  const [wellList, setWellList] = useState([
    {
      id: 1,
      name: 'Resak A1U',
    },
  ]);

  const [update, setUpdate] = useState(false);
  const [selectedWell, setSelectedWell] = useState('');
  const [searchWell, setSearchWell] = useState('');
  const [anno, setAnno] = useState(null);
  const [bgColor, setBgColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [component, setComponent] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const [cdft, setCdft] = useState(false);
  const [multipleElements, setMultipleElements] = useState({
    packerQty: 1,
    glmQty: 0,
    ssdQty: 0,
  });
  const [currentConfig, setCurrentConfig] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log('annos', annotations);

  const handleGetAllConfigs = () => {
    axios
      .get(`${configsURL}`)
      .then((res) => setAllConfigs(res.data))
      .catch((e) => console.log(e));
  };

  const handleGetAllWells = () => {
    axios
      .get(`${wellsURL}`)
      .then((res) => setAllWells(res.data))
      .catch((e) => console.log(e));
  };

  const handleSave = (formData) => {
    const isFound = allConfigs?.find((item) => item.id === configData?.id);

    const configObj = {
      configId: nanoid(),
      ...formData,
      annotations,
    };

    axios({
      method: isFound ? 'PUT' : 'POST',
      url: isFound ? `${configsURL}/${configData?.id}` : `${configsURL}`,
      data: configObj,
    })
      .then(() => setUpdate())
      .then(() => {
        toast({
          title: isFound ? 'Updated' : 'Created',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
          variant: 'subtle',
        });
      })
      .catch((e) => console.error(e));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${configsURL}/${id}`)
      .then(() => setUpdate(true))
      .then(() => {
        toast({
          title: 'Deleted',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
          variant: 'subtle',
        });
      })
      .catch((e) => console.error(e));
  };

  const handleDuplicate = (item) => {
    const configObj = {
      ...item,
      id: nanoid(),
      configId: nanoid(),
      configName: `${item.configName} copy`,
    };

    axios
      .post(`${configsURL}`, configObj)
      .then(() => setUpdate())
      .then(() => {
        toast({
          title: 'Duplicated',
          status: 'success',
          position: 'top-right',
          duration: 1500,
          isClosable: true,
          variant: 'subtle',
        });
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = () => {
    const isFound = allWells?.find((item) => item.wellName === selectedWell);

    // POST
    if (configData?.configName && selectedWell && !isFound) {
      const newWellObj = {
        wellName: selectedWell,
        configs: [
          {
            cdftDate: null,
            preventiveMaintenanceId: null,
            configId: configData?.configId,
            configName: configData?.configName,
            updatedAt: timestamp,
            barrierElements: configData?.barrierElements,
          },
        ],
      };

      axios
        .post(`${wellsURL}`, newWellObj)
        .then(() =>
          toast({
            title: `${selectedWell} updated`,
            status: 'success',
            position: 'top-right',
            duration: 1500,
            isClosable: true,
            variant: 'subtle',
          })
        )
        .then(() => setUpdate(true))
        .catch((e) => console.log(e));
    }

    // PATCH
    if (configData?.configName && selectedWell && isFound) {
      const existingWellObj = {
        configs: [
          ...isFound?.configs,
          {
            cdftDate: null,
            preventiveMaintenanceId: null,
            updatedAt: timestamp,
            ...configData,
          },
        ],
      };

      axios
        .patch(`${wellsURL}/${isFound?.id}`, existingWellObj)
        .then(() =>
          toast({
            title: `${selectedWell} updated`,
            status: 'success',
            position: 'top-right',
            duration: 1500,
            isClosable: true,
            variant: 'subtle',
          })
        )
        .then(() => setUpdate(true))
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      handleGetAllConfigs();
      handleGetAllWells();
      setUpdate(false);
    }
    return () => {
      subscribed = false;
    };
  }, [update]);

  useEffect(() => {
    setAnnotations(
      annotations?.map((item) =>
        item.id === anno?.id
          ? {
              ...anno,
            }
          : item
      )
    );
  }, [anno]);

  useEffect(() => {
    setConfigData((prev) => ({
      ...prev,
      annotations: annotations,
    }));
  }, [annotations]);

  useEffect(() => {
    setWellData((prev) => ({
      ...prev,
      ...wellData,
      configs: wellData?.configs?.map((item) =>
        item?.configId === currentConfig?.configId
          ? {
              ...currentConfig,
            }
          : item
      ),
    }));
  }, [currentConfig]);

  const filteredWells = useMemo(() => {
    if (!searchWell) return wellList;
    return wellList?.filter((item) => {
      return item.name.toLowerCase().includes(searchWell.toLowerCase());
    });
  }, [wellList, searchWell]);

  const resetBarriers = () => {
    if (configData) {
      const updated = configData?.barrierElements?.map((item) => ({
        ...item,
        barrier: 'none',
        status: null,
      }));
      setConfigData({ ...configData, barrierElements: updated });
      setUpdate(true);
    }

    if (currentConfig) {
      const updated = currentConfig?.barrierElements?.map((item) => ({
        ...item,
        barrier: 'none',
        status: null,
      }));
      setCurrentConfig({ ...currentConfig, barrierElements: updated });
      setUpdate(true);
    }
  };

  const getConfigHistory = async () => {
    const isFoundWell = allWells?.find(
      (item) => item.wellName === selectedWell
    );

    if (selectedWell && isFoundWell) {
      setWellData((prev) => ({ ...prev, ...isFoundWell }));
      setComponent('config history');
    }
  };

  const setColor = (name) => {
    if (configData) {
      let el = configData?.barrierElements?.find((item) => item?.name === name);

      if (el) {
        if (el.quantity === 0) {
          return 'none';
        } else if (el.barrier === 'primary') {
          return 'blue';
        } else if (el.barrier === 'secondary') {
          return 'red';
        } else if (el.barrier === 'none') {
          return 'black';
        } else {
          return 'none';
        }
      }
    }
  };

  const setFill = (name) => {
    let el = currentConfig?.barrierElements?.find(
      (item) => item?.name === name
    );

    if (el.status === 'pass') {
      return 'green';
    } else if (el.status === 'degraded') {
      return 'yellow';
    } else if (el.status === 'fail') {
      return 'red';
    } else {
      return 'none';
    }
  };

  const setStroke = (name) => {
    let el = currentConfig?.barrierElements?.find(
      (item) => item?.name === name
    );

    if (el.status === 'none') {
      if (el.quantity === 0) {
        return 'none';
      } else if (el.barrier === 'primary') {
        return 'blue';
      } else if (el.barrier === 'secondary') {
        return 'red';
      } else if (el.barrier === 'none') {
        return 'black';
      } else {
        return 'none';
      }
    }

    const setColor = (name) => {
      if (el?.status !== 'none') {
        return 'black';
      }
    };

    return setColor(name);
  };

  const previewCdft = () => {
    const barrierElementsWithStatus = currentConfig?.barrierElements?.map(
      (item1) => {
        const updatedItem = dummyCdftData.find(
          (item2) => item2.name === item1.name
        );
        return { ...item1, ...updatedItem };
      }
    );

    setCurrentConfig((prev) => ({
      ...prev,
      barrierElements: barrierElementsWithStatus,
    }));
    setCdft(true);
  };

  const handleSaveCdft = (formData) => {
    console.log('cdft', formData);
    // if (wellData) {
    //   console.log(currentConfig);
    // }
    // PATCH
    // if (configData?.configName && selectedWell && isFound) {
    //   const existingWellObj = {
    //     configs: [
    //       ...isFound?.configs,
    //       {
    //         cdftDate: null,
    //         preventiveMaintenanceId: null,
    //         updatedAt: timestamp,
    //         ...configData,
    //       },
    //     ],
    //   };
    //   axios
    //     .patch(`${wellsURL}/${isFound?.id}`, existingWellObj)
    //     .then(() =>
    //       toast({
    //         title: `${selectedWell} updated`,
    //         status: 'success',
    //         position: 'top-right',
    //         duration: 1500,
    //         isClosable: true,
    //         variant: 'subtle',
    //       })
    //     )
    //     .then(() => setUpdate(true))
    //     .catch((e) => console.log(e));
    // }
  };

  // console.log('curr configData', configData);

  const resetBgColor = () => {
    if (anno) {
      setAnno((prev) => ({
        ...anno,
        background: {
          ...anno.background,
          color: 'none',
        },
      }));
    }
  };

  useEffect(() => {
    resetBgColor();
  }, []);

  return (
    <BarrierContext.Provider
      value={{
        allConfigs,
        setAllConfigs,
        configData,
        setConfigData,
        selectedWell,
        setSelectedWell,
        wellList,
        annotations,
        setAnnotations,
        bgColor,
        setBgColor,
        strokeColor,
        setStrokeColor,
        searchWell,
        setSearchWell,
        filteredWells,
        resetBarriers,
        handleDuplicate,
        handleDelete,
        handleUpdate,
        handleSave,
        getConfigHistory,
        component,
        setComponent,
        multipleElements,
        setMultipleElements,
        update,
        setUpdate,
        previewCdft,
        wellData,
        setWellData,
        cdft,
        setCdft,
        setFill,
        setStroke,
        setColor,
        currentConfig,
        setCurrentConfig,
        handleSaveCdft,
        anno,
        setAnno,
        selectedOption,
        setSelectedOption,
        resetBgColor,
      }}
    >
      {children}
    </BarrierContext.Provider>
  );
};
