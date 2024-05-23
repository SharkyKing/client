import { Component } from 'react';
import { Scheduler, SchedulerData, ViewType, DemoData, wrapperFun } from 'react-big-schedule';
import './classbaseScheduler.css';

class Readonly extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData('2024-05-01', ViewType.Week, false, false, {
      besidesWidth: window.innerWidth <= 1600 ? 200 : 350,
      startResizable: false,
      endResizable: false,
      movable: false,
      creatable: false,
      schedulerMaxHeight: 200,
      views: [
        { viewName: 'Diena', viewType: ViewType.Day, showAgenda: false, isEventPerspective: false },
        { viewName: 'Savaitė', viewType: ViewType.Week, showAgenda: false, isEventPerspective: false },
        { viewName: 'Mėnesis', viewType: ViewType.Month, showAgenda: false, isEventPerspective: false }
      ],
      resourceName: '',
      addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
      eventItemPopoverDateFormat: 'MMM D',
      nonAgendaDayCellHeaderFormat: 'H',
      nonAgendaWeekCellHeaderFormat: 'ww/YYYY',
      nonAgendaMonthCellHeaderFormat: 'MMM YYYY',
      nonAgendaYearCellHeaderFormat: 'YYYY',
      nonAgendaOtherCellHeaderFormat: 'M/D',
    });
    schedulerData.localeDayjs.locale('lt');
    schedulerData.setResources([
      { id: 'r1', name: 'Susitikimai' }
    ]);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  render() {
    const { viewModel } = this.state;
    return (
      <Scheduler
        schedulerData={viewModel}
        prevClick={this.prevClick}
        nextClick={this.nextClick}
        onSelectDate={this.onSelectDate}
        onViewChange={this.onViewChange}
        eventItemClick={this.eventClicked}
        viewEventClick={this.ops1}
        viewEventText="Ops 1"
        viewEvent2Text="Ops 2"
        viewEvent2Click={this.ops2}
        toggleExpandFunc={this.toggleExpandFunc}
      />
    );
  }

  prevClick = schedulerData => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = schedulerData => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({ viewModel: schedulerData });
  };
}

export default wrapperFun(Readonly);