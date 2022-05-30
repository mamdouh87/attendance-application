import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAttendance } from 'app/shared/model/attendance.model';
import { getEntity, updateEntity, createEntity, reset } from './attendance.reducer';

export const AttendanceUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const attendanceEntity = useAppSelector(state => state.attendance.entity);
  const loading = useAppSelector(state => state.attendance.loading);
  const updating = useAppSelector(state => state.attendance.updating);
  const updateSuccess = useAppSelector(state => state.attendance.updateSuccess);
  const handleClose = () => {
    props.history.push('/attendance' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.logTimeFrom = convertDateTimeToServer(values.logTimeFrom);
    values.logTimeTo = convertDateTimeToServer(values.logTimeTo);

    const entity = {
      ...attendanceEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          logTimeFrom: displayDefaultDateTime(),
          logTimeTo: displayDefaultDateTime(),
        }
      : {
          ...attendanceEntity,
          logTimeFrom: convertDateTimeFromServer(attendanceEntity.logTimeFrom),
          logTimeTo: convertDateTimeFromServer(attendanceEntity.logTimeTo),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="attendanceApplicationApp.attendance.home.createOrEditLabel" data-cy="AttendanceCreateUpdateHeading">
            <Translate contentKey="attendanceApplicationApp.attendance.home.createOrEditLabel">Create or edit a Attendance</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="attendance-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('attendanceApplicationApp.attendance.logDate')}
                id="attendance-logDate"
                name="logDate"
                data-cy="logDate"
                type="date"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendance.logTimeFrom')}
                id="attendance-logTimeFrom"
                name="logTimeFrom"
                data-cy="logTimeFrom"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendance.logTimeTo')}
                id="attendance-logTimeTo"
                name="logTimeTo"
                data-cy="logTimeTo"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendance.permissionHours')}
                id="attendance-permissionHours"
                name="permissionHours"
                data-cy="permissionHours"
                type="text"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendance.details')}
                id="attendance-details"
                name="details"
                data-cy="details"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/attendance" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AttendanceUpdate;
