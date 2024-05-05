import { Box, Modal } from "@mui/material";
import './styles.scss';

import { JobDetailsModalProps } from "../../../../types";

const JobDetailsModal = (props: JobDetailsModalProps) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='Referral-Modal'>
        <span className="Heading">About this job:</span>
        <span className="Content">{props.body}</span>
      </Box>
    </Modal>
  );
};

export default JobDetailsModal;
