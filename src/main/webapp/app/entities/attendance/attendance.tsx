import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAttendance } from 'app/shared/model/attendance.model';
import { getEntities } from './attendance.reducer';

export const Attendance = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const attendanceList = useAppSelector(state => state.attendance.entities);
  const loading = useAppSelector(state => state.attendance.loading);
  const totalItems = useAppSelector(state => state.attendance.totalItems);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { match } = props;

  return (
    <div>
      <h2 id="attendance-heading" data-cy="AttendanceHeading">
        <Translate contentKey="attendanceApplicationApp.attendance.home.title">Attendances</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="attendanceApplicationApp.attendance.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/attendance/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="attendanceApplicationApp.attendance.home.createLabel">Create new Attendance</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {attendanceList && attendanceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('logDate')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.logDate">Log Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('logTimeFrom')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.logTimeFrom">Log Time From</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('logTimeTo')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.logTimeTo">Log Time To</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('permissionHours')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.permissionHours">Permission Hours</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('details')}>
                  <Translate contentKey="attendanceApplicationApp.attendance.details">Details</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="attendanceApplicationApp.attendance.attendanceType">Attendance Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="attendanceApplicationApp.attendance.employee">Employee</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="attendanceApplicationApp.attendance.managerApprovedBy">Manager Approved By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="attendanceApplicationApp.attendance.hrApprovedBy">Hr Approved By</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/attendance/${attendance.id}`} color="link" size="sm">
                      {attendance.id}
                    </Button>
                  </td>
                  <td>
                    {attendance.logDate ? <TextFormat type="date" value={attendance.logDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {attendance.logTimeFrom ? <TextFormat type="date" value={attendance.logTimeFrom} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{attendance.logTimeTo ? <TextFormat type="date" value={attendance.logTimeTo} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{attendance.permissionHours}</td>
                  <td>{attendance.details}</td>
                  <td>
                    {attendance.attendanceType ? (
                      <Link to={`/attendance-type/${attendance.attendanceType.id}`}>{attendance.attendanceType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{attendance.employee ? <Link to={`/employee/${attendance.employee.id}`}>{attendance.employee.id}</Link> : ''}</td>
                  <td>
                    {attendance.managerApprovedBy ? (
                      <Link to={`/employee/${attendance.managerApprovedBy.id}`}>{attendance.managerApprovedBy.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {attendance.hrApprovedBy ? (
                      <Link to={`/employee/${attendance.hrApprovedBy.id}`}>{attendance.hrApprovedBy.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/attendance/${attendance.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/attendance/${attendance.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/attendance/${attendance.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="attendanceApplicationApp.attendance.home.notFound">No Attendances found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={attendanceList && attendanceList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Attendance;
