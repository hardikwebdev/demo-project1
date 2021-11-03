@extends('layouts.guest')
@section('content')
    <div class="row w-100 mx-0">
        <div class="col-12 col-lg-6 mx-auto">
            @if (Session::has('message'))
                <div class="alert alert-success alert-dismissable">
                    {{ Session::get('message') }}
                </div>
            @endif
            @if (Session::has('status'))
                <div class="alert alert-success alert-dismissable">
                    {{ Session::get('status') }}
                </div>
            @endif
            @if (Session::has('success'))
                <div class="alert alert-success alert-dismissable">
                    {{ Session::get('success') }}
                </div>
            @endif

            @if (Session::has('error'))
                <div class="alert alert-danger alert-dismissable">
                    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
                    {{ Session::get('error') }}
                </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}" id="sendpasswordresetlink">
                @csrf
                <div class="row align-items-center justify-content-center login-gradient rounded p-3 p-md-5">
                    <div class="col-12 text-center">
                        <img src="{{ asset('assets/images/assets/Register_Account/Group83.png') }}" class="img-fluid"
                            alt="logo">
                    </div>
                    <div class="col-12 text-center mt-5">
                        <h2 class="font-weight-bold text-white">{{ __('custom.forgot_password') }}</h2>
                    </div>
                    <div class="col-12 mt-5">
                        <input id="email" type="email"
                            class="form-control grey-ph h-auto py-4 rounded-0 @error('email') is-invalid @enderror"
                            name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                            placeholder="{{ __('custom.email') }}">

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <div class="col-12 mt-3">
                        <button
                            class="btn bg-warning text-white py-4 font-weight-bold rounded-0 w-100  text-uppercase">{{ __('custom.forgot_password') }}
                            <img src="{{ asset('assets/images/assets/Staking_Pools/Group179.png') }}"
                                class="img-fluid ml-3 align-middle" alt=""></button>
                    </div>
                    <div class="col-12 mt-4">
                        <hr class="w-100 border border-white my-3" />
                    </div>
                    <div class="col-12 text-center mt-3">
                        <h4 class="text-light-pink">{{ __('custom.not_amember') }}<a href="{{ route('register') }}"
                                class="text-white ml-2">{{ __('custom.sign_up') }}</a></h4>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection
@section('scripts')
<script type="text/javascript">
$( document ).ready(function() {
    if ($("#sendpasswordresetlink").length > 0) {
        $("#sendpasswordresetlink").validate({
            rules: {
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                email: {
                    required: "Email is required.",
                    email: "Please enter valid email."
                },
            },
        })
    }
});
</script>
@endsection