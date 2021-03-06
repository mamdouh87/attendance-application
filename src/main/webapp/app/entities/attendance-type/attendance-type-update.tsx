import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAttendanceType } from 'app/shared/model/attendance-type.model';
import { getEntity, updateEntity, createEntity, reset } from './attendance-type.reducer';

export const AttendanceTypeUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const attendanceTypeEntity = useAppSelector(state => state.attendanceType.entity);
  const loading = useAppSelector(state => state.attendanceType.loading);
  const updating = useAppSelector(state => state.attendanceType.updating);
  const updateSuccess = useAppSelector(state => state.attendanceType.updateSuccess);
  const handleClose = () => {
    props.history.push('/attendance-type' + props.location.search);
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
    const entity = {
      ...attendanceTypeEntity,
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
      ? {}
      : {
          ...attendanceTypeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="attendanceApplicationApp.attendanceType.home.createOrEditLabel" data-cy="AttendanceTypeCreateUpdateHeading">
            <Translate contentKey="attendanceApplicationApp.attendanceType.home.createOrEditLabel">
              Create or edit a AttendanceType
            </Translate>
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
                  id="attendance-type-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('attendanceApplicationApp.attendanceType.code')}
                id="attendance-type-code"
                name="code"
                data-cy="code"
                type="text"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendanceType.descEn')}
                id="attendance-type-descEn"
                name="descEn"
                data-cy="descEn"
                type="text"
              />
              <ValidatedField
                label={translate('attendanceApplicationApp.attendanceType.descAr')}
                id="attendance-type-descAr"
                name="descAr"
                data-cy="descAr"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/attendance-type" replace color="info">
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

export default AttendanceTypeUpdate;
