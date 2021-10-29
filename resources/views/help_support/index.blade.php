@extends('layouts.app')
@section('content')
<div class="content-wrapper">
	<div class="row mt-5 pt-5">
		<div class="col-12">
			@if(Session::has('success'))
		    <div class="alert alert-success alert-dismissable">
		        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
		        {{ Session::get('success') }}
		    </div>
		    @endif

		    @if(Session::has('error'))
		    <div class="alert alert-danger alert-dismissable">
		        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
		        {{ Session::get('error') }}
		    </div>
			@endif
			<div class="mb-4">
				<ul class="nav nav-tabs justify-content-center account-tabs border-0">
				  <li><a class="text-warning border border-warning py-3 px-5 d-block fund-usdt-bank help-ajax active" data-type="2" data-toggle="tab" href="#home">All Tickets</a></li>
				  <li><a class="text-warning border border-warning py-3 px-5 d-block fund-usdt-bank help-ajax" data-toggle="tab" data-type="0" href="#menu1"> Open ({{$openTicketCount}})</a></li>
				  <li><a class="text-warning border border-warning py-3 px-5 d-block fund-usdt-bank help-ajax" data-toggle="tab" data-type="1" href="#menu2"> Close ({{$closeTicketCount}})</a></li>
				</ul>
				<p class="m-t-md mt-4 text-center ">
					<button class="btn bg-warning text-white py-3 px-4 rounded-sm" data-toggle="modal" data-target="#new-tickets">OPEN TICKET <img src="{{ asset('assets/images/assets/Staking_Pools/Group179.png') }}" class="img-fluid ml-4 d-inline align-middle" alt=""></button>
				</p>
			</div>
			<div class="table-responsive table-history">
				@include('help_support.help_supportajax')
			</div>
		</div>
	</div>
	<div class="row align-items-center mt-5">
		<div class="col-12 text-right">
			@if(isset($supportTicket))
			    <div class="ticket-ajax-pag">
			    	@if($supportTicket->count() > 0){{ $supportTicket->render() }}@endif
			    </div>
			@endif
		</div>
	</div>
	<div class="modal fade" id="new-tickets" tabindex="-1" role="dialog" aria-labelledby="newticketsLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h3 class="modal-title inline" id="exampleModalLabel">{{trans('custom.create_new_ticket')}}</h3>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      
	      {{Form::open(['route' => 'help_support.store','class' => '','id' =>'support-ticket','enctype' => 'multipart/form-data'])}}
	        <div class="modal-body">
	                <div class="form-group row">
	                    <div class="col-lg-12 form-group-sub">
	                        <div class="form-group">
	                            <div class="from-inner-space">
	                                <label class="mb-2 bmd-label-static">{{trans('custom.title')}}:<span
	                                    class="text-red">*</span></label>
	                                {!! Form::select('subject_id',$supportSubject,old('supportSubject'),['class'=>'form-control','placeholder'=>'Select Title']) !!}            
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <div class="col-lg-12 form-group-sub">
	                        <div class="form-group">
	                            <div class="from-inner-space">
	                                <label class="mb-2 bmd-label-static">{{trans('custom.attachment')}}:</label>
	                                <input name="attachment[]" type="file" multiple  />
	                            </div>
	                        </div>
	                    </div>
	                </div>
	                <div class="form-group row">
	                    <div class="col-lg-12 form-group-sub">
	                        <div class="form-group">
	                            <div class="from-inner-space">
	                                <label class="mb-2 bmd-label-static">{{trans('custom.message')}}:<span class="text-red">*</span></label>
	                                {!! Form::textarea('message', null, ['class'=> 'form-control' ,'id' => 'message', 'rows' => 4, 'cols' => 54]) !!}
	                            </div>
	                        </div>
	                    </div>
	                </div>
	        </div>
	        <div class="modal-footer">
	            <div class="form-group row">
	                <div class="col-lg-12 form-group-sub">
	                    <button type="submit" class="cus-width-auto cus-btn cus-btnbg-red btn btn-primary">{{trans('custom.save')}}</button>
	                </div>
	            </div>
	        </div>
	      {{Form::close()}}
	    </div>
	  </div>
	</div>
	@endsection