import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { APIKeyType } from '../config/types';
import IsAdminIcon from './Icons/IsAdminIcon';
import loadingWrapper from '../util/loadingWrapper';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: 400,
    margin: 'auto',
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
});

export const APIKeyCard = ({
  apiKey = {},
  loading = false,
  deleteButtonProps = {},
  editButtonProps = {},
}) => {
  const styles = useStyles();
  const { apiKey: key, email, notes, isAdmin } = apiKey;

  return (
    <Card className={styles.root}>
      <CardHeader
        avatar={
          loadingWrapper(loading, <IsAdminIcon isAdmin={isAdmin} />, 'circle')
        }
        title={loading ? <Skeleton width={100} variant={'text'} /> : email}
        subheader={loading ? <Skeleton width={150} variant={'text'} /> : key}
      />
      <CardContent>
        <Typography variant="body1">{loading ? [1,2,3].map((val) => <Skeleton key={val} style={{ width: '100%' }} />) : notes}</Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button
          disabled={loading}
          size="small"
          color="primary"
          variant={'contained'}
          {...editButtonProps}
        >
          Edit
        </Button>
        <Button
          disabled={loading}
          size="small"
          color="secondary"
          {...deleteButtonProps}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

APIKeyCard.propTypes = {
  apiKey: PropTypes.shape(APIKeyType),
  loading: PropTypes.bool,
  deleteButtonProps: PropTypes.object,
  editButtonProps: PropTypes.object,
};

APIKeyCard.defaultProps = {
  loading: false,
  onDelete: {},
  onEdit: {},
};

export default APIKeyCard;