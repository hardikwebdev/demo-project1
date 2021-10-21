<?php

namespace App\Http\Controllers\Backend;

use App\Models\User;
use App\Models\Country;
use App\Models\UserWallet;
use App\Models\UserBank;
use Illuminate\Http\Request;
use App\Models\UserAgreement;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::with(['userwallet', 'sponsor']);
        /* Search Functionality*/
        // if($request->group_id && $request->group_id!=""){
        //     $users = $users->where('member_group',$request->group_id);
        // }
        if ($request->keyword && $request->keyword != '') {
            $users = $users->where(function ($query) use ($request) {
                return $query
                    ->where('username', 'like', '%' . $request->keyword . '%')
                    ->orWhere('name', 'like', '%' . $request->keyword . '%')
                    ->orWhere('email', 'like', '%' . $request->keyword . '%');
            });
        }
        // if($request->promo_account && $request->promo_account!=""){
        //     $promo_account = ($request->promo_account == 2)? '0' : '1';
        //     $users = $users->where('promo_account',$promo_account);
        // }

        $data = $request->all();
        /* Search Functionality*/
        $users = $users
            ->OrderBy('id', 'desc')
            ->paginate(30)
            ->appends($request->all());
        // $groups = \App\Group::where('status','1')->pluck('name','id');
        // $packages = Model\Package::where('status','active')->pluck('name','id');
        $allusers = User::pluck('name', 'id');
        // return view('backend.users.index',compact('users','groups','data','packages','allusers'));
        return view(
            'backend.users.index',
            compact('users', 'data', 'allusers')
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $counties = Country::orderBy('country_name', 'asc')->pluck(
            'country_name',
            'id'
        );
        return view('backend.users.create', compact('counties'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        /* validation start */
        $rules = [
            'username' =>
                'required|string|unique:users,username,NULL,id,deleted_at,NULL|max:255|alpha_num',
            'email' =>
                'required|email|unique:users,email,NULL,id,deleted_at,NULL|max:255',
            'sponsor' => [
                'required',
                'string',
                'max:255',
                'exists:users,username',
            ],
            'password' => 'required',
            'retype_password' => 'required',
            'secure_password' => 'required',
            'retype_secure_password' => 'required',
            'ic_number' => 'required',
            'name' => 'required|max:255',
            'address' => 'required',
            'country' => 'required',
            'city' => 'required',
            'state' => 'required',
            'signature' => 'required',
            'name' => 'required',
            'branch' => 'required',
            'acc_holder_name' => 'required|same:name',
            'acc_number' => 'required',
            'swift_code' => 'required',
            'terms_condition' => 'required',
            'bank_country_id' => 'required',
        ];

        if ($request->country == '131') {
            $rules['ic_number'] = 'max:12';
        }

        $validatedData = $request->validate($rules);
        /* validation end */

        $data = $request->all();
        $count = User::where('identification_number', $request->ic_number)
            ->where(['status' => 'active'])
            ->count();
        if ($count >= 3) {
            $validator = Validator::make([], []);
            $validator
                ->getMessageBag()
                ->add('ic_number', trans('custom.max_3_identfication_allowed'));
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
        //     if(Helper::ic_number_verification($data['ic_number'],$data['sponsor']) == true){
        //     $validator = Validator::make([], []);
        //     $validator->getMessageBag()->add('ic_number',  trans('validation.unique',['attribute'=>'identification number']));
        //     return redirect()->back()->withErrors($validator)->withInput();
        //         // return response()->json(['success' => false, 'message' => trans('validation.unique',['attribute'=>'identification number']), "code" => 400], 400);
        // }
        $terms_condition = $request->terms_condition;
        $securePassword = md5($data['secure_password']);
        $sponsor_id = User::where('username', $data['sponsor'])
            ->where('status', 'active')
            ->first();

        $user = User::firstOrCreate([
            'name' => $data['name'],
            'sponsor_id' => $sponsor_id != null ? $sponsor_id->id : '0',
            'username' => $data['username'],
            'address' => $data['address'],
            'city' => $data['city'],
            'state' => $data['state'],
            'country_id' => $data['country'],
            'identification_number' => $data['ic_number'],
            'phone_number' => $data['phone_number'],
            'secure_password' => $securePassword,
            'email' => $data['email'],
            // 'password' => md5($data['password']),
            'password' => Hash::make($data['password']),
            'signature' => $data['signature'],
            // 'member_group'=>($sponsor_id != null ) ? $sponsor_id->member_group : '0',
            // 'is_consultant' => $request->filled('is_consultant'),
            // 'is_investor' => $request->filled('is_investor'),
            // 'fixed_rank' => $request->filled('is_consultant'),
            'email_verified_at' => date('Y-m-d H:i:s'),
        ]);
        // print_r($user);die();

        // if($request->mt4_id && $request->mt4_password && $request->mt4_id!="" && $request->mt4_password!=""){
        //     $user->mt4_user_id = $request->mt4_id;
        //     $user->mt4_password = $request->mt4_password;
        // }
        // if($request->filled('is_consultant')){
        //     $rank = Model\Rank::where('name','Consultant')->first();
        //     $user->rank_id = ($rank) ? $rank->id : 0;
        // }
        $userBank = UserBank::create([
            'user_id' => $user->id,
            'name' => $data['bank_name'],
            'branch' => $data['branch'],
            'account_holder' => $data['acc_holder_name'],
            'account_number' => $data['acc_number'],
            'swift_code' => $data['swift_code'],
            'bank_country_id' => $data['bank_country_id'],
        ]);

        

        $userAgreement = UserAgreement::create([
            'user_id' => $user->id,

            'aml_policy_statement' => in_array(
                'aml_policy_statement',
                $terms_condition
            )
                ? 1
                : 0,
            'risk_disclosure_statement' => in_array(
                'risk_disclosure_statement',
                $terms_condition
            )
                ? 1
                : 0,
            'user_agreement' => in_array('client_agreement', $terms_condition)
                ? 1
                : 0,
            'poa' => in_array('poa', $terms_condition) ? 1 : 0,
            'user_signature' => $data['signature'],
            'date_of_registration' => date('Y-m-d H:i:s'),
        ]);

        $UserWallet = UserWallet::create([
            'user_id' => $user->id,
        ]);
        $user->save();
        // Helper::updateDownline($user->id);
        return redirect()
            ->route('user.index')
            ->with(['success' => 'Customer added sucessfully.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $user =  User::with(['userwallet','sponsor','userbank','user_agreement','country','rank_detail','package_detail'])->where('username',$id)->first();
        // if(!$user){
        //     return redirect()->back()->with(['error'=>'User not Found']);
        // }
        // $fund_wallets = FundWallet::where('user_id',$id)->paginate(3)->withPath(route('admin_fund_wallet.index'));
        // view()->share('fund_wallets',$fund_wallets);

        // return view('backend.users.show',compact('user','counties'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = User::with([
            'userwallet',
            'sponsor',
            'userbank',
            'user_agreement',
        ])->find($id);

        if (!$user) {
            return redirect()
                ->back()
                ->with(['error' => 'User not Found']);
        }
        // event(new Registered($user));
        $counties = Country::orderBy('country_name', 'asc')->pluck(
            'country_name',
            'id'
        );
        // $ranks = Model\Rank::where('is_deleted','0')->pluck('name','id');
        // $packages = Model\Package::where('is_deleted','0')->where('status','active')->pluck('name','id');

        return view('backend.users.edit', compact('user', 'counties'));
        // return view('backend.users.edit',compact('user','counties','ranks','packages'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // if($request->total_capital ){

        //     $total_funding = Helper::get_user_topup_funding($id);

        //     $units_diff = $request->total_capital - $total_funding;

        //     if($units_diff == 0){
        //         return redirect()->back()->with('success','No change in values');
        //     } else if($units_diff > 0) {
        //         $type  = '1';
        //     } else {
        //         $type  = '0';
        //     }
        //     $topup_history = new Model\TopupFundHistory();
        //     $topup_history->user_id = $id;
        //     $topup_history->amount = $units_diff;
        //     $topup_history->type = $type;
        //     $topup_history->description =  trim($request->description)? trim($request->description) : 'Update by Admin';
        //     $topup_history->save();
        //     $total_funding = Helper::get_user_topup_funding($id);
        //     $users = User::where('id',$id)->update(['total_capital'=>$total_funding]);
        //     return redirect()->route('user.index')->with(['success'=>'Topup amount is updated.']);

        // }
        $user_detail = $user = User::where('id', $id)->first();
        $data = $request->all();
        $rules = [
            'username' =>
                'required|string|max:255|alpha_num|unique:users,username,' .
                $id .
                ',id,deleted_at,NULL',
            'email' =>
                'required|email|max:255|unique:users,email,' .
                $id .
                ',id,deleted_at,NULL',

            'sponsor' => [
                'required',
                'string',
                'max:255',
                'exists:users,username,deleted_at,NULL',
            ],
            'ic_number' => 'required',
            'name' => 'required|max:255',
            'address' => 'required',
            'country' => 'required',
            'city' => 'required',
            'state' => 'required',
            // 'signature' => 'required',
            'name' => 'required',
            'branch' => 'required',
            'acc_holder_name' => 'required|same:name',
            'acc_number' => 'required',
            'swift_code' => 'required',
            'terms_condition' => 'required',
            'bank_country_id' => 'required',
        ];
        if ($request->country == '131') {
            $rules['ic_number'] = 'max:12';
        }
        $validatedData = $request->validate($rules);
        // $count = User::where('identification_number',$request->ic_number)->where(['status'=>'active','is_deleted'=>'0'])->count();
        // if($count >= 3){
        //     $validator = Validator::make([], []);
        //     $validator->getMessageBag()->add('ic_number', trans('custom.max_3_identfication_allowed'));
        //     return redirect()->back()->withErrors($validator)->withInput();;
        // }
        // if(Helper::ic_number_verification($data['ic_number'],$data['sponsor']) == true){
        //       $validator = Validator::make([], []);
        //     $validator->getMessageBag()->add('ic_number',  trans('validation.unique',['attribute'=>'identification number']));
        //     return redirect()->back()->withErrors($validator)->withInput();
        //     // return response()->json(['success' => false, 'message' => trans('validation.unique',['attribute'=>'identification number']), "code" => 400], 400);
        // }
        $data = $request->all();
        try {
            /* Update user detail start*/
            $sponsor_id = User::where('username', $data['sponsor'])
                ->where('status', 'active')
                ->first();
            // $package_detail = Model\Package::where([
            //     'status' => 'active',
            //     'is_deleted' => '0',
            //     'id' => $request->package_id,
            // ])->first();
            // if ($package_detail != null) {
            //     if ($user->package_id != $request->package_id) {
            //         $PackageHistory = new PackageHistory();
            //         $PackageHistory->user_id = $user->id;
            //         $PackageHistory->package_amount = $package_detail->amount;
            //         if ($user->package_detail) {
            //             $PackageHistory->paid_amount =
            //                 $package_detail->amount -
            //                     $user->package_detail->amount >
            //                 0
            //                     ? $package_detail->amount -
            //                         $user->package_detail->amount
            //                     : -(
            //                         $package_detail->amount -
            //                         $user->package_detail->amount
            //                     );
            //             // $PackageHistory->invest_id =  $user->id;
            //             $PackageHistory->type =
            //                 $package_detail->amount -
            //                     $user->package_detail->amount >
            //                 0
            //                     ? 1
            //                     : 0; // for Upgrade package
            //         } else {
            //             $PackageHistory->paid_amount = $package_detail->amount;
            //             // $PackageHistory->invest_id =  $user->id;
            //             $PackageHistory->type = 1; // for Upgrade package
            //         }

            //         $PackageHistory->updated_at = date('Y-m-d');
            //         $PackageHistory->save();

            //         $message = 'Package update successfully';
            //     }
            // } elseif ($user->package_id && $user->package_id != 0) {
            //     $PackageHistory = new PackageHistory();
            //     $PackageHistory->user_id = $user->id;
            //     $PackageHistory->package_amount = 0;
            //     $PackageHistory->paid_amount = 0;
            //     // $PackageHistory->invest_id =  $user->id;
            //     $PackageHistory->type = 0; // for Upgrade package
            //     $PackageHistory->updated_at = date('Y-m-d');
            //     $PackageHistory->save();
            //     $message = 'Package update successfully';
            // }
            $input_user_data = [
                'name' => $data['name'],
                'sponsor_id' => $sponsor_id != null ? $sponsor_id->id : '0',
                'username' => $data['username'],
                'address' => $data['address'],
                'city' => $data['city'],
                'state' => $data['state'],
                'country_id' => $data['country'],
                'identification_number' => $data['ic_number'],
                'phone_number' => $data['phone_number'],
                'email' => $data['email'],
                // 'signature'=>$data['signature'],
                // 'rank_id' => $data['rank_id'],
                // 'package_id' => $data['package_id'],
                'status' => $data['status'],
                // 'fixed_rank' => isset($data['fixed_rank'])
                //     ? $data['fixed_rank']
                //     : '0',
                // 'promo_account' => $data['promo_account'],
                // 'is_consultant' => $request->filled('is_consultant'),
                // 'is_investor' => $request->filled('is_investor'),
                // 'payment_methods' => $request->payment_methods,
                // 'downline_user_transfer'=>$data['downline_user_transfer'],
                // 'enable_fund_wallet'=>$data['enable_fund_wallet'],
                // 'disabled_commission'=>$data['disabled_commission'],
            ];
            // if ($request->promo_account && $request->promo_account == '1') {
            // }
            if ($request->password && $request->password != '') {
                // $input_user_data['password'] = md5($data['password']);
                $input_user_data['password'] = Hash::make($data['password']);
            }
            if ($request->secure_password && $request->secure_password != '') {
                $input_user_data['secure_password'] = md5(
                    $data['secure_password']
                );
            }
            // if (
            //     $request->mt4_id &&
            //     $request->mt4_password &&
            //     $request->mt4_id != '' &&
            //     $request->mt4_password != ''
            // ) {
            //     $input_user_data['mt4_user_id'] = $request->mt4_id;
            //     $input_user_data['mt4_password'] = $request->mt4_password;
            // }
            // if ($request->filled('is_consultant')) {
            //     $rank = Model\Rank::where('name', 'Consultant')->first();
            //     // $input_user_data['rank_id'] = ($rank) ? $rank->id : 0;
            // }
            // print_r($input_user_data);die();
            User::where('id', $id)->update($input_user_data);

            /* Update user detail end */

            /* Update user bank end */
            $input_bank_data = [
                'name' => $data['bank_name'],
                'branch' => $data['branch'],
                'account_holder' => $data['acc_holder_name'],
                'account_number' => $data['acc_number'],
                'swift_code' => $data['swift_code'],
                'bank_country_id' => $data['bank_country_id'],
            ];
            $user_bank_detail = UserBank::firstOrCreate(['user_id' => $id]);
            $user_bank_detail = UserBank::where('user_id', $id)->update(
                $input_bank_data
            );
            /* Update user bank end */

            /* Update user agreement end */
            $input_aggrement_data = [
                'aml_policy_statement' => in_array(
                    'aml_policy_statement',
                    $data['terms_condition']
                )
                    ? 1
                    : 0,
                'risk_disclosure_statement' => in_array(
                    'risk_disclosure_statement',
                    $data['terms_condition']
                )
                    ? 1
                    : 0,
                'user_agreement' => in_array(
                    'client_agreement',
                    $data['terms_condition']
                )
                    ? 1
                    : 0,
                'poa' => in_array('poa', $data['terms_condition']) ? 1 : 0,
                'user_signature' => $data['name'],
            ];
            $user_agreement_detail = UserAgreement::firstOrCreate([
                'user_id' => $id,
            ]);
            $user_agreement_detail = UserAgreement::where(
                'user_id',
                $id
            )->update($input_aggrement_data);
            /* Update user agreement end */

            return redirect()
                ->route('user.index')
                ->with(['success' => 'Customer update sucessfully.']);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        try {
            $user = User::find($id);
            if (!$user) {
                return redirect()
                    ->back()
                    ->with(['error' => 'User not Found']);
            }

            // if ($user->package_id == 0 && $user->userwallet->fund_wallet <= 0 && $user->proof_status == 0 ) {
            if ($user->userwallet->crypto_wallet <= 0) {
                // $user->is_deleted = '1';
                // $user->save();
                UserAgreement::where('user_id', $id)->delete();
                // UploadProof::where('user_id',$id)->delete();
                UserBank::where('user_id', $id)->delete();
                UserWallet::where('user_id', $id)->delete();
                // UserBeneficiary::where('user_id', $id)->delete();
                // PackageHistory::where('user_id', $id)->delete();
                // FundWallet::where('user_id', $id)->delete();
                // WithdrawalRequest::where('user_id', $id)->delete();
                // UserReferral::where('user_id', $id)->delete();
                $user->forceDelete();
                return redirect()
                    ->route('user.index')
                    ->with(['success' => 'Customer delete sucessfully.']);
            } else {
                return redirect()
                    ->route('user.index')
                    ->with([
                        'error' =>
                            'Selected user has some important data. So, you are not allow to delete this user.',
                    ]);
            }
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
    }
}
