<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Reclamation;
use App\Entity\User;
use App\Entity\Report;
use App\Entity\Employe;
use App\Services\JwtAuth;
use App\Entity\Rating;
use PHPUnit\Framework\MockObject\Builder\Identity;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExtractorController extends AbstractController
{/**
     * @Route("/extractor", name="extractor")
     */
    public function problemAction(Request $request,JwtAuth $jwt_auth): Response
    {
        $em = $this->getDoctrine()->getManager();
        $token = $request->get("authorization",null);
        $authCheck = $jwt_auth->checkToken($token);
        $identity = $jwt_auth->checkToken($token,true);
        if($authCheck){
            
        $repository = $this->getDoctrine()->getRepository(Reclamation::class)->findall();

        $data = array();   
        if($repository) {
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';

            //identit wa7adha timchich
            //7ot nayik$identity->(il colonne)
        }
        
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
    $data[0]['stat']= '404';
    $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
else{
    $data[0]['stat']= '401';
    $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
}
}

    /**
     * @Route("/extractor1", name="extractor id")
     */
    public function problelistmAction(Request $request): Response
    {
        $id = $request->get('id');

        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository(Reclamation::class)->findBy(array(
            'idu'=>$id
        ));

        $data = array();  
        if($repository) { 
        foreach($repository as $key=>$rec){
            $data[$key]['type']= $rec->getType();
            $data[$key]['description']= $rec->getDescription();
            $data[$key]['statut']= $rec->getStatut();
            $data[$key]['date_creation']= $rec->getDateCreation()->format('d/m/y');
            $data[$key]['id_user']= $rec->getIdu()->getID();
            $data[$key]['id']= $rec->getId();
            $data[$key]['stat']= 'success';
        }
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }else{
        $data[0]['stat']= '404';
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
    }
    


    /**
     * @Route("/newC", name="egh", methods="POST")
     */
    public function newAction(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(User::class);
        

        $json = $request->get('json');
        $params = json_decode($json);
        $createdAt = new \Datetime('now');

        $rec = new Reclamation();
        $user = $repository->findOneBy(['id' =>$params->id]);
        if($user){
        $rec->setIdu($user);
        $rec->settype($params->type);
        $rec->setDescription($params->description);
        $rec->setStatut($params->status);
        $rec->setDateCreation($createdAt);

        $em->persist($rec);
		$em->flush();

        $data = array(
            'status'=>'success',
            'code'	=>200,
            'data'	=>$rec,
            'msg'	=>'detail'
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array(
            'stat'=>'404',
        );
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
        
    }
    
  /**
     * @Route("/dashboard", name="dashboard")
     */
    public function typeAction(Request $request): Response{
    $em = $this->getDoctrine()->getManager();
    $new = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'New'
    )));
    $todo = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'Treated'
    )));
    $finished = count($em->getRepository(Reclamation::class)->findBy(array(
        'statut'=>'Inprogress'
    )));
    if($new && $todo && $finished){
    $data = array(
        'New'=>$new,
        'Treated'	=>$todo,
        'Inprogress'	=>$finished
    );

    $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array(
            'stat'=>'404',
        );
        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
    
            return $response;
        }
        
    }


/**
     * @Route("/login", name="login", methods="POST")
     */
    public function login(Request $request, JwtAuth $jwt_auth): Response{
    
        $repository = $this->getDoctrine()->getRepository(Employe::class);
        $json = $request->get('json');
        $params = json_decode($json);

        if($json!=null){
            $params = json_decode($json);
            
            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;
            $getHash = (isset($params->getHash)) ? $params->getHash : null;
            $pwd = hash('sha256', $password);
            $user = $repository->findOneBy(['email' => $params->email,'password' => $pwd]);
            if ($user!=null) {
                if($getHash == null || $getHash == false){
                    $signup = $jwt_auth->signup($email, $pwd);
                }else{
                    $signup = $jwt_auth->signup($email, $pwd, true);
                }
                
                $response = new jsonResponse($signup);
                $response->headers->set('Access-Control-Allow-Origin', '*');
            
                    return $response;
            }else{
                $repository = $this->getDoctrine()->getRepository(User::class);
                $json = $request->get('json');
                $params = json_decode($json);
        
                if($json!=null){
                    $params = json_decode($json);
                    
                    $email = (isset($params->email)) ? $params->email : null;
                    $password = (isset($params->password)) ? $params->password : null;
                    $getHash = (isset($params->getHash)) ? $params->getHash : null;
                    $pwd = hash('sha256', $password);
                    $user = $repository->findOneBy(['email' => $params->email,'password' => $pwd]);
                    if ($user!=null) {
                        if($getHash == null || $getHash == false){
                            $signup = $jwt_auth->signup($email, $pwd);
                        }else{
                            $signup = $jwt_auth->signup($email, $pwd, true);
                        }
                        
                        $response = new jsonResponse($signup);
                        $response->headers->set('Access-Control-Allow-Origin', '*');
                    
                            return $response;
                    }  else{
                        $data=array(
                            'stat' => '404'
                        );
                        $response = new jsonResponse($data);
                        $response->headers->set('Access-Control-Allow-Origin', '*');
                    
                            return $response;
                    }
                    
            }
            else{
            $data=array(
                'stat' => '404'
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    
    }
    }}
    
    /**
     * @Route("/supp", name="supp")
     */
    public function suppRec(Request $request): Response{
        $em = $this->getDoctrine()->getManager();

        $json = $request->get('id');
        

        $rec = $em->getRepository(Reclamation::class)->findOneBy(['id' => $json]);

        if($rec!=null)
        {
            $em->remove($rec);
            $em->flush();
            $data = array(
                'stat'=>'success',
            );
            $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    }


 /**
     * @Route("/deleteR", name="deleteR")
     */
    public function deleteR(Request $request): Response{
        $em = $this->getDoctrine()->getManager();

        $json = $request->get('id');
       
        $rec = $em->getRepository(Report::class)->findOneBy(['id' => $json]);

        if($rec!=null)
        {
            $em->remove($rec);
            $em->flush();
            $data = array(
                'stat'=>'success',
            );
            $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    }

      /**
     * @Route("/editRec", name="edit")
     */
    public function editRec(Request $request): Response{
        $repository = $this->getDoctrine()->getRepository(Reclamation::class);
        $em = $this->getDoctrine()->getManager();
        $json = $request->get('json');
        $params = json_decode($json);
        $rec = $repository->findOneBy(['id' => $params->id]);
        
        if($rec!=null)
        {
            $rec->setType($params->type);
            $rec->setDescription($params->description);
            $rec->setStatut($params->statut);
            $rec->setDateCreation($params->date_creation);
            $rec->setIdu($params->idu);

            $em->persist($rec);
            $em->flush();
            
            $response = new jsonResponse('success');
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
    }

     /**
     * @Route("/detail", name="Details")
     */

    public function getProblem(Request $request): Response{
        $id = $request->get('id');
        $em = $this->getDoctrine()->getManager();
        $dql = "SELECT R,U.Full_name as user FROM App\Entity\Reclamation R LEFT JOIN App\Entity\User U"
                ." WITH IDENTITY(R.idu,'id') = U.id"
                ." WHERE (R.id=:id)";
        $query = $em->createQuery($dql);

        $query->setParameter('id', $id);

        $problem = $query->getArrayResult();
        if($problem){
            $data = array(
            'status'=>'success',
            'code'	=>200,
            'data'	=>$problem,
            'msg'	=>'Task detail'
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
   
    }

    /**
     * @Route("/update", name="updatefgh", methods="POST")
     */
    public function updaterec(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Reclamation::class);


        $json = $request->get('json');
        $params = json_decode($json);
        $rec = $repository->findOneBy(['id' =>$params->id]);
        if($params->statut == $rec->getStatut()){
            $data = array(
                'stat'=>'404',
            );
        }
        else{
        $rec->setStatut($params->statut);
        $em->persist($rec);
        $em->flush();
        $data = array(
            'status'=>'success',
            'code'    =>200,
        );
        }


    
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

   /**
     * @Route("/newR", name="report", methods="POST")
    */
    public function newR(Request $request): Response{
        $em = $this->getDoctrine()->getManager();

        $json = $request->get('json');
        $params = json_decode($json);
        $createdAt = new \Datetime('now');
        $repemp = $this->getDoctrine()->getRepository(Employe::class);
        $reprec = $this->getDoctrine()->getRepository(Reclamation::class);
        $emp = $repemp->findOneBy(['id' =>$params->idEmploye]);
        $rec = $reprec->findOneBy(['id' =>$params->idProbleme]);

        

        $rapport = new Report();
        $rapport->setIdEmploye($emp);
        $rapport->setidReclamation($rec);
        $rapport->setDescription($params->description);
        $rapport->setCreationDate($createdAt);

        $em->persist($rapport);
        

        $rating = $this->getDoctrine()->getRepository(Rating::class)->findOneBy(array(
			'idReclamation' => $params->idProbleme
		));
        if($rating==null && ($emp->getRole()=='employe')){
            
            $rati = new Rating();
            $rati->setIdReclamation($rec);
            $rati->setIdEmploye($emp);
            $em->persist($rati);
            $rec->setStatut('Inprogress');
            $em->persist($rec);
        }

        $em->flush();
        $data = array(
            'status'=>'success',

            'code'    =>200,
        );
        $response = new jsonResponse($data);

    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
    /**
     * @Route("/getrep", name="getrep")
     */
    public function reportAction(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();
        $id = $request->get('id');
        $repository = $this->getDoctrine()->getRepository(Report::class)->findBy(array('idReclamation' => $id), array('creationDate' => 'DESC'));
        $data = array();    
        if($repository)
        {
        foreach($repository as $key=>$rec){
            $data[$key]['nom']= $rec->getIdEmploye()->getFullName();
            $data[$key]['idr']= $rec->getId();
            $data[$key]['desc']= $rec->getDescription();
            $data[$key]['id']= $rec->getIdReclamation();
            $data[$key]['date_creation']= $rec->getCreationDate()->format('d/m/y');
            $data[$key]['role']= $rec->getIdEmploye()->getRole();
            $data[$key]['image']= $rec->getIdEmploye()->getImage();
            $data[$key]['stat']= 'success';
        }
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array();
        $data[0]['stat']= '404';

        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    
    }
    }
    



    /**
     * @Route("/signup", name="signup")
     */
    public function signupAction(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(User::class);
        $json = $request->get('json');
        $params = json_decode($json);
        $password = hash('sha256',$params->password);
        $user = $this->getDoctrine()->getRepository(Employe::class)->findOneBy(array(
			'email' => $params->email
		));
        $used=true;
        if($user){
            $used=false;

        }else{
            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(array(
                'email' => $params->email
            ));
            if($user){
                $used=false;
        }}
        if($used){
        $rec = new User();
        $rec->setFullName($params->Full_name);
        $rec->setEmail($params->email);
        $rec->setPhoneNumber($params->phone_number);
        $rec->setPassword($password);
        $rec->setImage($params->image);
        $em->persist($rec);
		$em->flush();
        $data = array(
            'stat'=>'success',
            'code'	=>200,
            'data'	=>$rec,
            'msg'	=>'detail'
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }else{
        $data = array(
            'stat'=>'402',
        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }

}

/**
     * @Route("/allreports2", name="allreports2")
     */
    public function allreports2(Request $request,$id=null): Response
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Report::class)->findall();
        $data = array();    
        if($repository)
        {
        foreach($repository as $key=>$rec){
            if($rec->getIdEmploye()->getRole()=='employe'){
            $data[$key]['nom']= $rec->getIdEmploye()->getFullName();
            $data[$key]['desc']= $rec->getDescription();
            $data[$key]['id']= $rec->getIdReclamation();
            $data[$key]['date_creation']= $rec->getCreationDate()->format('d/m/y');
            $data[$key]['role']= $rec->getIdEmploye()->getRole();
            $data[$key]['image']= $rec->getIdEmploye()->getImage();
            $data[$key]['stat']= 'success';
        }

        }

       

        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array();
        $data[0]['stat']= '404';

        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
    }
/**
     * @Route("/rating", name="rating")
     */
    public function rating(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();
        $json = $request->get('json');
        $params = json_decode($json);
       
        $repemp = $this->getDoctrine()->getRepository(Employe::class);
        $reprec = $this->getDoctrine()->getRepository(Reclamation::class);
        $repcli = $this->getDoctrine()->getRepository(User::class);

        
        $cli = $repcli->findOneBy(['id' =>$params->idClient]);

        $rating = $this->getDoctrine()->getRepository(Rating::class)->findOneBy(array(
			'idReclamation' => $params->idReclamation
		));
        if($rating){
            $rating->setRating($params->rating);
            $rating->setIdClient($cli);
            $em->persist($rating);
        }

        $em->flush();
        $data = array(
            'status'=>'success'
        );
        $response = new jsonResponse($data);

    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

    /**
     * @Route("/getrating", name="getrating")
     */
    public function getrating(Request $request): Response
    {
        $em = $this->getDoctrine()->getManager();
        $repository = $this->getDoctrine()->getRepository(Rating::class)->findall();
        $data = array();

        if($repository)
        {
        foreach($repository as $key=>$rec){
            $data[$key]['nomE']= $rec->getIdEmploye()->getFullName();
            $data[$key]['photo']= $rec->getIdEmploye()->getImage();
            $data[$key]['nomC']= $rec->getIdClient()->getFullName();
            $data[$key]['rating']= $rec->getRating();
            
        }
        
        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else{
        $data = array();
        $data[0]['stat']= '404';

        $response = new jsonResponse($data);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
    }

    /**
     * @Route("/moyrating", name="moyrating")
     */

    public function moyrating(Request $request): Response{
        $id = $request->get('id');
        $em = $this->getDoctrine()->getManager();
        $dql = "SELECT R,AVG(R.rating) as moy,E.Full_name,E.image  FROM App\Entity\Rating R LEFT JOIN App\Entity\Employe E"
        ." WITH IDENTITY(R.idEmploye) = E.id"
                ." Group By R.idEmploye";
                
        $query = $em->createQuery($dql);


        $problem = $query->getArrayResult();
        if($problem){
            $data = array(
            'status'=>'success',

            'code'	=>200,
            'data'	=>$problem,
            'msg'	=>'Task detail'

        );

        $response = new jsonResponse($data);
    $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }else
        {
            $data = array(
                'stat'=>'404',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
        
                return $response;
        }
   
    }

/**
     * @Route("/suppUser/{id}", name="suppUser")
     */
    public function suppUser($id): Response{
        $em = $this->getDoctrine()->getManager();
        $User = $em->getRepository(User::class)->findOneBy(['id' => $id]);
        if($User!=null)
        {
            $em->remove($User);
            $em->flush();
            $data = array(
                'status'=>'success',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
        }
        else
        {
            $data = array(
                'status'=>'error',
            );
            $response = new jsonResponse($data);
            $response->headers->set('Access-Control-Allow-Origin', '*');
                return $response;
        }
    }
    /**
     * @Route("/EditUser/{id}", name="EDITUSER" , methods="POST")
     */
    public function editUser(Request $request,$id): Response{
        $em = $this->getDoctrine()->getManager();
        $User = $em->getRepository(User::class)->findOneBy(['id' => $id]);

        $json = $request->get('json');
        $params = json_decode($json);

        if($User!=null)
        {
            $User->setFullName($params->Full_name);
            $User->setEmail($params->email);
            $User->setPhoneNumber($params->phone_number);
            $User->setPassword($params->password);
            $User->setImage($params->image);

            $em->persist($User);
            $em->flush();
            
            $response = new jsonResponse('success');
            $response->headers->set('Access-Control-Allow-Origin', '*');
        }
        else
        {
            $response = new jsonResponse('Failed');
            $response->headers->set('Access-Control-Allow-Origin', '*');
        }
        return $response;
    }
    /**
     * @Route("/getListUser", name="getUSERS" , methods="POST")
     */
    public function getAllList(Request $request): Response{
        $em = $this->getDoctrine()->getManager();
        $User = $em->getRepository(User::class)->findAll();

        $response = new Response(json_encode($User));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Route("/getUserByID/{id}", name="getUserByID" , methods="POST")
     */
    public function getMe(Request $request,$id): Response{
        $em = $this->getDoctrine()->getManager();
        $User = $em->getRepository(User::class)->findOneBy(['id' => $id]);

        $response = new Response(json_encode($User));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

}
