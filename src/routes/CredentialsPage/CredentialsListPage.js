import React, {
  useState,
  useEffect,
} from 'react';
import {
  useHistory,
} from 'react-router-dom';
import useAxios from "axios-hooks";
import {
  useSnackbar,
} from 'notistack';
import { API_URI } from "../../config/constants";
import { useApiKey } from '../../util/useApiKey';
import CredentialsList from '../../components/CredentialsList/CredentialsList';

const TABLE_CONFIG = {
  fields: [
    {
      label: "CPE",
      fieldName: "cpe",
      align: "left"
    },
    {
      label: "Username",
      fieldName: 'username',
    },
    {
      label: "Password",
      fieldName: 'password',
    },
  ],
  pagination: {
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultRowsPerPage: 10,
  }
};

const CredentialsListPage = () => {
  const history = useHistory();
  const [paginationParams, setPaginationParams] = useState();
  const [apikey] = useApiKey(s => [s.apikey]);

  const { enqueueSnackbar } = useSnackbar();

  const [{ data, loading, error }] = useAxios({
    url: `${API_URI}/credentials`,
    headers: {
      'X-API-KEY': apikey,
    },
    params: {
      ...paginationParams
    }
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      enqueueSnackbar('There was an error loading the requested data.');
    }
  }, [error, enqueueSnackbar]);

  const handlePaginationChange = ({ rowsPerPage, page }) => {
    setPaginationParams({
      ...paginationParams,
      ...(rowsPerPage && { limit: rowsPerPage }),
      ...((page || page === 0) && { page: parseInt(page) + 1 }),
    });
  };

  const formatData = (data) => {
    return data.map((item) => (
      {
        ...item,
        cpe: `cpe:/${item.cpe.part}:${item.cpe.vendor}:${item.cpe.product}`,
        rowProps: { onClick: () => history.push(`/credentials/${item._id}`), style: {cursor: 'pointer'} }
      }
    ));
  };

  return (
    <CredentialsList
      data={data ? formatData(data.docs) : null}
      loading={loading}
      dataConfig={TABLE_CONFIG}
      rowsPerPage={data?.limit}
      page={data ? data.page - 1 : null}
      totalRows={data?.total}
      updateConfig={handlePaginationChange}
    />
  );
};

export default CredentialsListPage;
